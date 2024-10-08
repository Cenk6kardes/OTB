import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as components from './components';

const routes: Routes = [{ path: '', component: components.SettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
