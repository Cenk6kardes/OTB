import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthenticationService } from '../../../../services/authentication/authentication.service';

@Component({
  selector: 'otb-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  constructor(public readonly authenticationService: AuthenticationService) {}
}
