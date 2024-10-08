import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'otb-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="lds-main" [ngClass]="{'fullPage': isFullPage}"><div class="lds-ripple"><div></div><div></div></div></div>
  `,
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
  @Input() public isFullPage = false;
}
