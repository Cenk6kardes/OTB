import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as components from './components';

const routes: Routes = [
  {
    path: '',
    component: components.HomepageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
