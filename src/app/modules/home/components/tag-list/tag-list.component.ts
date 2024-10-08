import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TagService } from '../../services/tag/tag.service';
import { PostFeedService } from '../../services/post/post-feed.service';
import { PageService } from '../../../../services/page/page.service';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'otb-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagListComponent {
  constructor(
    public readonly tagService: TagService,
    private readonly postFeedService: PostFeedService,
    private readonly pageService: PageService,
    private readonly categoryService: CategoryService,
  ) {}

  selectTag(id: string | null): void {
    const pageId = this.pageService.activePageId;

    if (id) {
      this.postFeedService.getPostList({ pageId, tagId: id });

      this.categoryService.unselectSelectedCategory();
      this.tagService.updateSelectedTag(id);
    } else {
      this.postFeedService.getPostList({
        pageId,
        categoryId: this.categoryService.lastActiveCategoryId,
      });

      this.tagService.unselectSelectedTag();
      this.categoryService.updateSelectedCategory();
    }
  }
}
