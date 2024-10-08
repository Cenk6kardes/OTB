import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as components from './components';

const routes: Routes = [
  { path: 'signin', component: components.SigninComponent },
  { path: 'signup', component: components.SignupComponent },
  { path: '', redirectTo: '/auth/signin', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
