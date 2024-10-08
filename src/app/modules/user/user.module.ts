import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { SlugifyPipe } from '../../pipes/slugify/slugify.pipe';

import { SectionComponent } from '../../components/section/section.component';
import * as components from './components';

const COMPONENTS = [
  components.UserProfileComponent,
  components.PostTableComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    UserRoutingModule,
    SlugifyPipe,
    MdbTooltipModule,
    MdbFormsModule,
    SectionComponent,
    MdbAccordionModule,
  ],
})
export class UserModule {}
