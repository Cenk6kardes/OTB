import { Injectable } from '@angular/core';

import { BaseApiService } from '../base-api/base-api.service';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

import { BaseOptionsRequest } from '../../models/base-options-request.model';
import { Item } from '../../models/item.model';
import { GenericResponse } from '../../models/generic-response.model';
import {
  ILevelStatus,
  IPostLevel,
  IPostStatus,
} from '../../models/post-level-status.model';
import {
  IForEdit,
  IForProfilePost,
  IFromUrl,
  IPost,
} from '../../models/post.model';
import { IPostDetailItem } from '../../models/post-details.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public singlePost = new BehaviorSubject<IPost>({
    customTitle: '',
    title: '',
    content: '',
    summary: '',
    postStatusId: null,
    postLevelId: null,
    tags: [],
    categories: [],
    url: '',
  });

  private _categories = new BehaviorSubject<Item[]>([]);
  public categories$!: Observable<Item[]>;
  private _tags = new BehaviorSubject<Item[]>([]);
  public tags$!: Observable<Item[]>;
  private _levels = new BehaviorSubject<IPostLevel[]>([]);
  public levels$!: Observable<IPostLevel[]>;
  private _statuses = new BehaviorSubject<IPostStatus[]>([]);
  public statues$!: Observable<IPostStatus[]>;
  public postId = new BehaviorSubject<string>('');

  constructor(private readonly baseApiService: BaseApiService) {
    this.categories$ = this._categories.asObservable();
    this.tags$ = this._tags.asObservable();
    this.levels$ = this._levels.asObservable();
    this.statues$ = this._statuses.asObservable();
  }

  public get postIdValue(): string {
    return this.postId.value;
  }

  getFromUrl(url: string): Observable<IFromUrl> {
    const searchParams: BaseOptionsRequest = {
      ['Url']: url,
    };

    return this.baseApiService
      .get<GenericResponse<IFromUrl>>(`/Post/FromUrl`, searchParams)
      .pipe(
        map((response: GenericResponse<IFromUrl>) => {
          return response.value;
        }),
      );
  }

  createPost(post: IPost): Observable<boolean> {
    return this.baseApiService
      .save<GenericResponse<string>>('/Post', post)
      .pipe(
        map(() => {
          return true;
        }),
      );
  }

  editPost(post: IPost): Observable<boolean> {
    return this.baseApiService
      .update<GenericResponse<string>>('/Post', post)
      .pipe(
        map(() => {
          return true;
        }),
      );
  }

  getForEdit(id: string): Observable<IForEdit> {
    return this.baseApiService
      .get<GenericResponse<IForEdit>>(`/Post/ForEdit/${id}`)
      .pipe(
        map((response: GenericResponse<IForEdit>) => {
          this.singlePost.next({
            id: response.value.id,
            customTitle: response.value.customTitle,
            title: response.value.title,
            summary: response.value.summary,
            content: response.value.content,
            postStatusId: response.value.status.id,
            postLevelId: response.value.level.id,
            tags: response.value?.tags.map((tag) => tag.id),
            categories: response.value.categories.map(
              (category) => category.id
            ),
            url: response.value.url,
          });

          this._levels.next(response.value.postLevelList);
          this._statuses.next(response.value.postStatusList);

          return response.value;
        }),
      );
  }

  getTags(): Observable<boolean> {
    if (this._tags.value.length > 0) return of(true);

    const searchParams: BaseOptionsRequest = {
      ['Pagination.PageNumber']: 0,
      ['Pagination.PageSize']: 100,
    };

    return this.baseApiService
      .get<GenericResponse<Item[]>>('/Tag', searchParams)
      .pipe(
        map((response: GenericResponse<Item[]>) => {
          this._tags.next(response.value);

          return true;
        }),
      );
  }

  getByUser(): Observable<IForProfilePost[]> {
    const searchParams: BaseOptionsRequest = {
      ['Pagination.PageNumber']: 0,
      ['Pagination.PageSize']: 100,
    };

    return this.baseApiService
      .get<GenericResponse<IForProfilePost[]>>(`/Post/ByUser`, searchParams)
      .pipe(
        map((response: GenericResponse<IForProfilePost[]>) => {
          return response.value;
        }),
      );
  }

  getBookmarkedByUser(): Observable<IForProfilePost[]> {
    const searchParams: BaseOptionsRequest = {
      ['Pagination.PageNumber']: 0,
      ['Pagination.PageSize']: 100,
    };

    return this.baseApiService
      .get<GenericResponse<IForProfilePost[]>>(
        `/Post/Bookmarked/ByUser`,
        searchParams
      )
      .pipe(
        map((response: GenericResponse<IForProfilePost[]>) => {
          return response.value;
        }),
      );
  }

  getForApproval(): Observable<IForProfilePost[]> {
    const searchParams: BaseOptionsRequest = {
      ['Pagination.PageNumber']: 0,
      ['Pagination.PageSize']: 100,
    };

    return this.baseApiService
      .get<GenericResponse<IForProfilePost[]>>(`/Post/ForApproval`, searchParams)
      .pipe(
        map((response: GenericResponse<IForProfilePost[]>) => {
          return response.value;
        }),
      );
  }


  getForCreate(): Observable<boolean> {
    if (this._levels.value.length > 0) return of(true);

    return this.baseApiService
      .get<GenericResponse<ILevelStatus>>(`/Post/ForCreate`)
      .pipe(
        map((response: GenericResponse<ILevelStatus>) => {
          this._levels.next(response.value.postLevelList);
          this._statuses.next(response.value.postStatusList);

          return true;
        }),
      );
  }

  getPostDetailById(id: string): Observable<IPostDetailItem> {
    return this.baseApiService
      .get<GenericResponse<IPostDetailItem>>(`/Post/${id}`)
      .pipe(
        map((response: GenericResponse<IPostDetailItem>) => {
          return response.value;
        }),
      );
  }

  putBookmarkPost(postId: string, isBookmarked: boolean): Observable<unknown> {
    return this.baseApiService.update('/Post/Bookmark', {
      postId,
      isBookmarked,
    });
  }

  putLikePost(postId: string, isLiked: boolean): Observable<unknown> {
    return this.baseApiService.update('/Post/Like', { postId, isLiked });
  }
}
