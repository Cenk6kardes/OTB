import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PostFeedService } from '../../services/post/post-feed.service';
import { Observable } from 'rxjs';

import { PostCardItem } from '../../../../models/post-card.model';

@Component({
  selector: 'otb-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent {
  public items$!: Observable<PostCardItem[]>;

  constructor(private readonly postFeedService: PostFeedService) {
    this.items$ = this.postFeedService.posts$;
  }
}
