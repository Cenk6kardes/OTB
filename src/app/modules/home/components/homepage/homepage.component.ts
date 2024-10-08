import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageService } from '../../../../services/page/page.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'otb-homepage-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
  constructor(
    private readonly pageService: PageService,
    private readonly route: ActivatedRoute,
  ) {
    const slug$: Observable<string> = this.route.params.pipe(
      map((p) => p['slug'])
    );
    slug$.subscribe((slug: string | undefined) =>
      this.pageService.changeActivePage(slug ? slug : '/', true)
    );
  }
}
