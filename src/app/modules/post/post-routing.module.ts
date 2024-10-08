import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostService } from './../../services/post/post.service';
import { PageService } from '../../services/page/page.service';
import { CategoryService } from '../home/services/category/category.service';

import * as components from './components';

const routes: Routes = [
  // { path: 'type-selection', component: components.TypeSelectionComponent },
  {
    path: 'new',
    component: components.NewPostComponent,
    resolve: [
      () => inject(PostService).getForCreate(),
      () => inject(PostService).getTags(),
      () =>
        inject(CategoryService).getCategoriesOfThePage(
          inject(PageService).activePageId
        ),
    ],
  },
  {
    path: 'edit/:id',
    component: components.EditPostComponent,
    resolve: [() => inject(PostService).getTags()],
  },
  { path: 'detail/:id', component: components.PostDetailComponent },
  { path: '', redirectTo: 'new', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule { }
