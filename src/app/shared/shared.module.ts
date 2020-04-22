import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BlogArticleCardComponent } from './components/blog-article-card/blog-article-card.component';
import { FiltersComponent } from './components/filters/filters.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { FilterDrawerComponent } from './components/filter-drawer/filter-drawer.component';

const SHARED_COMPONENTS = [
  NavbarComponent,
  PageHeaderComponent,
  FooterComponent,
  BlogArticleCardComponent,
  FiltersComponent,
  ContentCardComponent,
  FilterDrawerComponent,
]

@NgModule({
  declarations: [
    ...SHARED_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    ReactiveFormsModule
  ],
  exports: [
    ...SHARED_COMPONENTS
  ]
})
export class SharedModule { }
