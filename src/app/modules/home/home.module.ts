import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { SlugifyPipe } from '../../pipes/slugify/slugify.pipe';

import { SectionComponent } from '../../components/section/section.component';
import { FluidSectionComponent } from '../../components/fluid-section/fluid-section.component';
import { CreateNewPostButtonComponent } from '../../components/create-new-post-button/create-new-post-button.component';

import * as components from './components';

const COMPONENTS = [
  components.HomepageComponent,
  components.HeroComponent,
  components.CategoryTabsComponent,
  components.TagListComponent,
  components.PostCardComponent,
  components.PostFeedComponent,
  components.MostLikedPostsComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SlugifyPipe,
    MdbDropdownModule,
    MdbRippleModule,
    SectionComponent,
    FluidSectionComponent,
    CreateNewPostButtonComponent,
  ],
})
export class HomeModule {}
