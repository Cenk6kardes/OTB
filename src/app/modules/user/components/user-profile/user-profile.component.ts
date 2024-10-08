import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../../../services/authentication/authentication.service';

import { UserProfile } from '../../../../models/user-profile.model';

@Component({
  selector: 'otb-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnInit {
  public userData!: UserProfile;
  public userPostListCollapsed = true;
  public userBookmarkedPostListCollapsed = true;

  constructor(
    public readonly authenticationService: AuthenticationService,
    private readonly route: ActivatedRoute,
    private readonly window: Window,
  ) {}

  ngOnInit(): void {
    this.userData = this.route.snapshot.data['UserProfileData'];
  }

  openGravatarLoginPage(): void {
    this.window.open('https://www.gravatar.com/', '_blank');
  }
}
