import { Component } from '@angular/core';

import { LoadingSpinnerService } from './services/loading-spinner/loading-spinner.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { PageService } from './services/page/page.service';
import { Observable } from 'rxjs';

import { User } from './models/authentication.model';
import { Page } from './models/page.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'OTB - Orion Tech Blog';
  public isLoggedIn: Observable<User>;
  public gotPages: Observable<Page[]>;

  constructor(
    public readonly loadingSpinner: LoadingSpinnerService,
    private readonly authenticationService: AuthenticationService,
    private readonly pageService: PageService,
  ) {
    this.isLoggedIn = this.authenticationService.user$;
    this.gotPages = this.pageService.pages$;
  }
}
