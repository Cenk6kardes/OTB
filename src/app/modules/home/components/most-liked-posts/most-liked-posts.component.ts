import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MostLikedPostsService } from '../../services/most-liked-posts/most-liked-posts.service';
import { Observable } from 'rxjs';

import { Item } from '../../../../models/item.model';

@Component({
  selector: 'otb-most-liked-posts',
  templateUrl: './most-liked-posts.component.html',
  styleUrls: ['./most-liked-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MostLikedPostsComponent {
  public mostLikeData!: Observable<Item[]>;

  constructor(private readonly mostLikedPostsService: MostLikedPostsService) {
    this.mostLikeData = this.mostLikedPostsService.mostLikedPosts$;
  }
}
