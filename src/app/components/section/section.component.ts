import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'otb-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  @Input() sectionClasses = '';
  @Input() containerClasses = '';
  @Input() rowClasses = '';
  @Input() colClasses = '';
  @Input() bgHeight = 55;
  @Input() bgImageUrl?: string;
}
