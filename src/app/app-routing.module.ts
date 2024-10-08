import { AuthGuard } from './guards/auth.guard';
import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageService } from './services/page/page.service';
import { UserService } from './services/user/user.service';
import { AuthenticationService } from './services/authentication/authentication.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    resolve: [() => inject(PageService).getPageList()],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
        pathMatch: 'full',
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
        resolve: {
          UserProfileData: () => inject(UserService).getUserById(inject(AuthenticationService).userValue.userId),
        },
      },
      {
        path: ':slug/post',
        loadChildren: () =>
          import('./modules/post/post.module').then(
            (m) => m.PostModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./modules/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'not-found',
        loadChildren: () =>
          import('./modules/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
      {
        path: ':slug',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
