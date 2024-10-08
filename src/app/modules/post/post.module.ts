import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { NgSelectModule } from '@ng-select/ng-select';
import { PostRoutingModule } from './post-routing.module';

import { SectionComponent } from './../../components/section/section.component';
import * as components from './components';
import { NgxEditorModule } from 'ngx-editor';

const COMPONENTS = [
  components.TypeSelectionComponent,
  components.NewPostComponent,
  components.PostFormComponent,
  components.EditPostComponent,
  components.PostDetailComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    PostRoutingModule,
    MdbValidationModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbTooltipModule,
    NgSelectModule,
    SectionComponent,
    NgxEditorModule,
  ],
})
export class PostModule { }
