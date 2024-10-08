import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CategoryService } from '../../services/category/category.service';
import { PostFeedService } from '../../services/post/post-feed.service';
import { PageService } from '../../../../services/page/page.service';
import { TagService } from '../../services/tag/tag.service';

@Component({
  selector: 'otb-category-tabs',
  templateUrl: './category-tabs.component.html',
  styleUrls: ['./category-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryTabsComponent {
  constructor(
    public readonly categoryService: CategoryService,
    private readonly postFeedService: PostFeedService,
    private readonly pageService: PageService,
    private readonly tagService: TagService,
  ) {}

  selectCategory(id: string | null): void {
    if (id) {
      this.postFeedService.getPostList({
        pageId: this.pageService.activePageId,
        categoryId: id,
      });
      
      this.tagService.unselectSelectedTag();
      this.categoryService.updateSelectedCategory(id);
    }
  }
}
