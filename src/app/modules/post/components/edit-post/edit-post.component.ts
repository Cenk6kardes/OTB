import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from '../../../../modules/home/services/category/category.service';
import { PageService } from '../../../../services/page/page.service';
import { PostService } from '../../../../services/post/post.service';

@Component({
  selector: 'otb-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostComponent {
  constructor(
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly pageService: PageService,
    private readonly route: ActivatedRoute,
  ) {
    if (!this.postService.singlePost.value.id) {
      this.postService.getForEdit(this.route.snapshot.params['id']).subscribe({
        next: (response) => {
          this.pageService.activePageId = response.pageId;
          this.categoryService
            .getCategoriesOfThePage(this.pageService.activePageId)
            .subscribe();
        },
      });
    }
  }
}
