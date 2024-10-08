import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PageService } from '../../services/page/page.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Observable, skipWhile, take } from 'rxjs';

import { Page } from '../../models/page.model';

@Component({
  selector: 'otb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public pages$!: Observable<Page[]>;
  public userName!: string;

  constructor(
    private readonly pageService: PageService,
    public readonly authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.pages$ = this.pageService.pages$.pipe(
      skipWhile((list) => list.length < 1),
      take(1),
    );

    this.userName = this.authenticationService.userValue.userName;
  }

  setActivePageId(pageSlug: string): void {
    location.href.endsWith(pageSlug) ? '' : this.pageService.changeActivePage(pageSlug);
  }
}
