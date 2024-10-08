import { Injectable } from '@angular/core';

import { PostFeedService } from '../post/post-feed.service';
import { BaseApiService } from '../../../../services/base-api/base-api.service';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { GenericResponse } from '../../../../models/generic-response.model';
import { BaseOptionsRequest } from '../../../../models/base-options-request.model';
import { Item, SelectableItem } from '../../../../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categories: SelectableItem[] = [];
  private categories$$ = new BehaviorSubject<SelectableItem[]>(
    this._categories
  );
  public categories$!: Observable<SelectableItem[]>;

  private _lastActiveCategoryId = '';
  set lastActiveCategoryId(categoryId: string) {
    this._lastActiveCategoryId = categoryId;
  }
  get lastActiveCategoryId() {
    return this._lastActiveCategoryId;
  }

  constructor(
    private readonly postFeedService: PostFeedService,
    private readonly baseApiService: BaseApiService,
  ) {
    this.categories$ = this.categories$$.asObservable();
  }

  getCategoriesOfThePage(pageId: string): Observable<boolean> {
    const params: BaseOptionsRequest = {
      ['Id']: pageId,
      ['Pagination.PageNumber']: 0,
      ['Pagination.PageSize']: 100,
    };

    return this.baseApiService
      .get<GenericResponse<Item[]>>('/Category/ByPage', params)
      .pipe(
        map((response: GenericResponse<Item[]>) => {
          this._categories = response.value
            .sort((a, b) => (a.orderNo < b.orderNo ? -1 : 1))
            .map((category: Item) => {
              return {
                ...category,
                selected: category.orderNo === 0,
              };
            });

          this.categories$$.next(this._categories);

          return true;
        }),
        tap(() => {
          this.lastActiveCategoryId = this._categories[0].id;

          this.postFeedService.getPostList({
            pageId,
            categoryId: this.lastActiveCategoryId,
          });
        })
      );
  }

  updateSelectedCategory(categoryId = this._lastActiveCategoryId): void {
    this._lastActiveCategoryId = categoryId;

    this.categories$$.next(
      this._categories.map((category: SelectableItem) => {
        category.selected = category.id === categoryId;

        return category;
      })
    );
  }

  unselectSelectedCategory(): void {
    this.categories$$.next(
      this._categories.map((category: SelectableItem) => {
        category.selected = false;

        return category;
      })
    );
  }
}
