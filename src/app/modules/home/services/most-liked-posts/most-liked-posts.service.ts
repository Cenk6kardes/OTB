import { Injectable } from '@angular/core';

import { BaseApiService } from '../../../../services/base-api/base-api.service';
import { BehaviorSubject, Observable, map, retry } from 'rxjs';

import { BaseOptionsRequest } from '../../../../models/base-options-request.model';
import { GenericResponse } from '../../../../models/generic-response.model';
import { Item } from '../../../../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class MostLikedPostsService {
  private mostLikedPosts$$ = new BehaviorSubject<Item[]>([]);
  public mostLikedPosts$!: Observable<Item[]>;

  constructor(private readonly baseApiService: BaseApiService) {
    this.mostLikedPosts$ = this.mostLikedPosts$$.asObservable();
  }

  getMostLikedPostListByCategory(categoryId: string): Observable<boolean> {
    const params: BaseOptionsRequest = {
      ['CategoryId']: categoryId,
      ['Pagination.PageNumber']: 0,
      ['Pagination.PageSize']: 10,
    };

    return this.baseApiService
      .get<GenericResponse<Item[]>>('/Post/MostLiked', params)
      .pipe(
        retry(1),
        map((response: GenericResponse<Item[]>) => {
          this.mostLikedPosts$$.next(response.value);

          return true;
        }),
      );
  }
}
