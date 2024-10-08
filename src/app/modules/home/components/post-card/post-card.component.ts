import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PostFeedService } from '../../services/post/post-feed.service';
import { PostService } from '../../../../services/post/post.service';
import { PageService } from '../../../../services/page/page.service';
import { CategoryService } from '../../services/category/category.service';
import { TagService } from '../../services/tag/tag.service';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';

import { ContactUsModalComponent } from '../../../../components/modals/contact-us/contact-us-modal.component';

import { PostCardItem } from '../../../../models/post-card.model';

@Component({
  selector: 'otb-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
  @Input() public postCardData!: PostCardItem;
  public modalRef!: MdbModalRef<ContactUsModalComponent>;

  constructor(
    public readonly authenticationService: AuthenticationService,
    private readonly postFeedService: PostFeedService,
    private readonly postService: PostService,
    private readonly modalService: MdbModalService,
    private readonly pageService: PageService,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  tagClickHandler(tagId: string): void {
    this.postFeedService.getPostList({
      pageId: this.pageService.activePageId,
      tagId,
    });

    this.categoryService.unselectSelectedCategory();
    this.tagService.updateSelectedTag(tagId);
  }

  likeButtonHandler(postCardItem: PostCardItem): void {
    postCardItem.isLiked
      ? (postCardItem.likeCount -= 1)
      : (postCardItem.likeCount += 1);
    postCardItem.isLiked = !postCardItem.isLiked;

    this.postService
      .putLikePost(postCardItem.id, postCardItem.isLiked)
      .subscribe();
  }

  bookmarkButtonHandler(postCardItem: PostCardItem): void {
    postCardItem.isBookmarked = !postCardItem.isBookmarked;
    this.postService
      .putBookmarkPost(postCardItem.id, postCardItem.isBookmarked)
      .subscribe();
  }

  openModal(postCardItem: PostCardItem): void {
    this.modalRef = this.modalService.open(ContactUsModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        title: 'Report Related Post',
        relatedPostId: postCardItem.id,
      },
    });
  }
}
