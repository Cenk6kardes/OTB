import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BaseApiService } from '../base-api/base-api.service';
import { CategoryService } from '../../modules/home/services/category/category.service';
import { TagService } from '../../modules/home/services/tag/tag.service';
import {
  BehaviorSubject,
  forkJoin,
  map,
  Observable,
  of,
  retry,
  switchMap,
  take,
} from 'rxjs';

import { GenericResponse } from '../../models/generic-response.model';
import { Page } from '../../models/page.model';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private _pages: Page[] = [];
  private pages$$ = new BehaviorSubject<Page[]>(this._pages);
  public pages$!: Observable<Page[]>;

  private _activePageId!: string;
  public set activePageId(pageId: string) {
    this._activePageId = pageId;
  }
  public get activePageId() {
    return this._activePageId;
  }

  constructor(
    private readonly baseApiService: BaseApiService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
    private readonly router: Router,
  ) {
    this.pages$ = this.pages$$.asObservable();
  }

  getPageList(): Observable<[boolean, boolean] | boolean> {
    let times = 1;
    let isPageSelected = false;

    return this.baseApiService.get<GenericResponse<Page[]>>('/Page').pipe(
      retry({ count: 4, delay: 2000 * times++ }),
      map((response: GenericResponse<Page[]>) => {
        this._pages = response.value
          .sort((a, b) => (a.orderNo < b.orderNo ? -1 : 1))
          .map((page: Page) => {
            const slug = page.orderNo === 0 ? '/' : this.setSlug(page.title);
            let selected = location.href.endsWith(slug);

            if (!selected) { // This will catch active page at post module level
              selected = location.href.includes(slug === '/' ? page.title.toLocaleLowerCase() : slug);
            }

            if (selected) {
              this._activePageId = page.id;
              isPageSelected = true;
            }

            return { ...page, slug, selected };
          });

        this.pages$$.next(this._pages);

        return true;
      }),
      switchMap(() =>
        isPageSelected ? this.getCategoriesAndTags() : of(true)
      ),
      take(1),
    );
  }

  changeActivePage(slug: string, checkExistence = false): void {
    const activePageIndex = this._pages.findIndex(
      (page: Page) => page.slug === slug
    );

    if (activePageIndex < 0 && checkExistence) {
      this.router.navigateByUrl('/not-found');
    }

    if (activePageIndex > -1) {
      this._activePageId = this._pages[activePageIndex].id;

      this.pages$$.next(
        this._pages.map((page: Page) => {
          page.selected = page.slug === slug;

          return page;
        })
      );

      this.getCategoriesAndTags().subscribe();
      // checkExistence ? '' : this.getCategoriesAndTags().subscribe();
    }
  }

  getIdOfTheActivePage(): string {
    const activePageIndex = this._pages.findIndex(
      (page: Page) => page.selected
    );

    return this._pages[activePageIndex].id;
  }

  getTheActivePagesSlug(): string {
    const activePageIndex = this._pages.findIndex(
      (page: Page) => page.selected
    );

    return this.setSlug(this._pages[activePageIndex].title);
  }

  manualPageReload(): void {
    this.activePageId = this._pages[0].id;
    this.changeActivePage('/');
    this.pages$$.next(this._pages);
    this.router.navigate(['/']);
  }

  private getCategoriesAndTags(): Observable<[boolean, boolean]> {
    return forkJoin([
      this.categoryService
        .getCategoriesOfThePage(this._activePageId)
        .pipe(take(1)),
      this.tagService.getTags(this._activePageId).pipe(take(1)),
    ]).pipe(take(1));
  }

  private setSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w-]+/g, ' ')
      .replace(/\s+/g, '-');
  }
}
