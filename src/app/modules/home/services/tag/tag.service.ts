import { Injectable } from '@angular/core';

import { BaseApiService } from '../../../../services/base-api/base-api.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { GenericResponse } from '../../../../models/generic-response.model';
import { BaseOptionsRequest } from '../../../../models/base-options-request.model';
import { Item, SelectableItem } from '../../../../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private _tags: SelectableItem[] = [];
  private tags$$ = new BehaviorSubject<SelectableItem[]>(this._tags);
  public tags$!: Observable<SelectableItem[]>;

  constructor(private readonly baseApiService: BaseApiService) {
    this.tags$ = this.tags$$.asObservable();
  }

  getTags(pageId: string): Observable<boolean> {
    const params: BaseOptionsRequest = {
      ['PageId']: pageId,
    };

    return this.baseApiService
      .get<GenericResponse<Item[]>>('/Tag/Summary', params)
      .pipe(
        map((response: GenericResponse<Item[]>) => {
          this._tags = response.value
            .sort((a, b) => ((a.count || 0) > (b.count || 0) ? -1 : 1))
            .map((tag: Item) => {
              return {
                ...tag,
                selected: tag.orderNo === 0,
              };
            });
          this.tags$$.next(this._tags);

          return true;
        }),
      );
  }

  updateSelectedTag(tagId: string): void {
    this.tags$$.next(
      this._tags.map((tag: SelectableItem) => {
        tag.selected = tag.id === tagId;

        return tag;
      })
    );
  }

  unselectSelectedTag(): void {
    this.tags$$.next(
      this._tags.map((tag: SelectableItem) => {
        tag.selected = false;

        return tag;
      })
    );
  }
}
