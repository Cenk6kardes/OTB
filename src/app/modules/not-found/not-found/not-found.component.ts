import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'otb-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent { }
