import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'otb-fluid-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fluid-section.component.html',
  styleUrls: ['./fluid-section.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class FluidSectionComponent {
  @Input() sectionClasses = '';
  @Input() containerClasses = '';
  @Input() rowClasses = '';
  @Input() colClasses = '';
  @Input() bgHeight = 55;
  @Input() bgImageUrl?: string;
}
