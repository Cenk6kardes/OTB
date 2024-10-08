import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { PostService } from '../../../../services/post/post.service';
import { AuthenticationService } from '../../../../services/authentication/authentication.service';
import { take } from 'rxjs';

import { IForProfilePost } from '../../../../models/post.model';

@Component({
  selector: 'otb-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostTableComponent implements OnInit {
  @Input() public isBookmarked!: boolean;
  @Input() public isAdmin!: boolean;
  public postListData!: IForProfilePost[];
  public showUsernameColumn!: boolean;

  constructor(
    public readonly authenticationService: AuthenticationService,
    private readonly postService: PostService,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.showUsernameColumn = this.isBookmarked || this.isAdmin;

    this.getPostData(this.isBookmarked, this.isAdmin);
  }

  private getPostData(isBookmarked: boolean, isAdmin: boolean): void {
    if (isBookmarked) {
      this.postService
        .getBookmarkedByUser()
        .pipe(take(1))
        .subscribe(this.handleResponse);
    } else if (isAdmin) {
      this.postService
        .getForApproval()
        .pipe(take(1))
        .subscribe(this.handleResponse);
    } else {
      this.postService
        .getByUser()
        .pipe(take(1))
        .subscribe(this.handleResponse);
    }
  }

  private handleResponse = (response: IForProfilePost[]) => {
    this.postListData = response;
    this.cdRef.detectChanges();
  }
}
