import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'otb-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostComponent {}
