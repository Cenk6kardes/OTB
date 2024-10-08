import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { SectionComponent } from 'src/app/components/section/section.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';

const routes: Routes = [{ path: '', component: NotFoundComponent }];

@NgModule({
  declarations: [
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MdbTooltipModule,
    SectionComponent,
  ]
})
export class NotFoundModule { }
