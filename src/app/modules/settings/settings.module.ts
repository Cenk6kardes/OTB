import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';

import { SectionComponent } from 'src/app/components/section/section.component';
import * as components from './components';

const COMPONENTS = [
  components.SettingsComponent,
];


@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MdbTooltipModule,
    SectionComponent,
  ]
})
export class SettingsModule { }
