import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BlogArticleCardComponent } from './blog-article-card/blog-article-card.component';
import { FiltersComponent } from './filters/filters.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ContentCardComponent } from './content-card/content-card.component';



@NgModule({
  declarations: [
    NavbarComponent,
    PageHeaderComponent,
    FooterComponent,
    BlogArticleCardComponent,
    FiltersComponent,
    ContentCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    PageHeaderComponent,
    FooterComponent,
    BlogArticleCardComponent,
    FiltersComponent,
    ContentCardComponent
  ]
})
export class SharedModule { }
