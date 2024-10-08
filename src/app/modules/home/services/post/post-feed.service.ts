import { Injectable } from '@angular/core';

import { BaseApiService } from '../../../../services/base-api/base-api.service';
import { MostLikedPostsService } from '../most-liked-posts/most-liked-posts.service';
import { BehaviorSubject, map, Observable, take } from 'rxjs';

import { GenericResponse } from '../../../../models/generic-response.model';
import { BaseOptionsRequest } from '../../../../models/base-options-request.model';
import { PostCardItem } from '../../../../models/post-card.model';

@Injectable({ providedIn: 'root' })
export class PostFeedService {
  private _posts: PostCardItem[] = [];
  private posts$$ = new BehaviorSubject<PostCardItem[]>(this._posts);
  public posts$!: Observable<PostCardItem[]>;

  constructor(
    private readonly baseApiService: BaseApiService,
    private readonly mostLikedPostsService: MostLikedPostsService,
  ) {
    this.posts$ = this.posts$$.asObservable();
  }

  getPostList(by: {
    pageId: string;
    categoryId?: string;
    tagId?: string;
  }): void {
    if (by?.categoryId) {
      this.getPostsByCategory(by.pageId, by.categoryId)
        .pipe(take(1))
        .subscribe();

      this.mostLikedPostsService
        .getMostLikedPostListByCategory(by.categoryId)
        .pipe(take(1))
        .subscribe();
    }

    if (by?.tagId) {
      this.getPostsByTag(by.pageId, by.tagId).pipe(take(1)).subscribe();
    }
  }

  private getPostsByCategory(
    pageId: string,
    categoryId: string
  ): Observable<boolean> {
    const params: BaseOptionsRequest = {
      ['PageId']: pageId,
      ['CategoryId']: categoryId,
      ['Pagination.PageNumber']: 0,
      ['Pagination.PageSize']: 100,
    };

    return this.baseApiService
      .get<GenericResponse<PostCardItem[]>>('/Post/ByCategory', params)
      .pipe(
        map((response: GenericResponse<PostCardItem[]>) => {
          this.posts$$.next(response.value);

          return true;
        })
      );
  }

  private getPostsByTag(pageId: string, tagId: string): Observable<boolean> {
    const params: BaseOptionsRequest = {
      ['PageId']: pageId,
      ['TagId']: tagId,
      ['Pagination.PageNumber']: 0,
      ['Pagination.PageSize']: 100,
    };

    return this.baseApiService
      .get<GenericResponse<PostCardItem[]>>('/Post/ByTag', params)
      .pipe(
        map((response: GenericResponse<PostCardItem[]>) => {
          this.posts$$.next(response.value);

          return true;
        })
      );
  }
}
