import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingSpinnerService } from '../../../../services/loading-spinner/loading-spinner.service';
import { PostService } from '../../../../services/post/post.service';

import { BACKEND_API_URL } from '../../../../models/constants';
import { IPostDetailItem } from '../../../../models/post-details.model';

@Component({
  selector: 'otb-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent {
  public postDetail = {} as IPostDetailItem;

  constructor(
    private readonly postService: PostService,
    private readonly loadingSpinnerService: LoadingSpinnerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef,
  ) {
    if (!this.postService.singlePost.value.id) {
      this.postService
        .getPostDetailById(this.route.snapshot.params['id'])
        .subscribe({
          next: (response) => {
            this.postDetail = response;
            this.cdRef.detectChanges();
          },
          error: () => {
            this.router.navigate(['']);
          },
        });
    }
  }

  bookmarkButtonHandler() {
    this.postDetail.isBookmarkedByUser = !this.postDetail.isBookmarkedByUser;

    this.postService
      .putBookmarkPost(this.postDetail.id, this.postDetail.isBookmarkedByUser)
      .subscribe();

    this.loadingSpinnerService.setLoading(
      false,
      `${BACKEND_API_URL}/Post/Bookmark`
    );
  }

  likeButtonHandler() {
    this.postDetail.isLikedByUser = !this.postDetail.isLikedByUser;

    this.postService
      .putLikePost(this.postDetail.id, this.postDetail.isLikedByUser)
      .subscribe();

    this.loadingSpinnerService.setLoading(
      false,
      `${BACKEND_API_URL}/Post/Like`
    );
  }
}
