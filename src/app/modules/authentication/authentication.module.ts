import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';

import { SectionComponent } from '../../components/section/section.component';
import * as components from './components';

const COMPONENTS = [components.SignupComponent, components.SigninComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MdbTooltipModule,
    MdbFormsModule,
    MdbValidationModule,
    MdbCheckboxModule,
    MdbRippleModule,
    SectionComponent,
  ],
})
export class AuthenticationModule {}
