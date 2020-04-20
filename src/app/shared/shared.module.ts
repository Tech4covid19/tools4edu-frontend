import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BlogArticleCardComponent } from './blog-article-card/blog-article-card.component';



@NgModule({
  declarations: [
    NavbarComponent,
    PageHeaderComponent,
    FooterComponent,
    BlogArticleCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CarouselModule
  ],
  exports: [
    NavbarComponent,
    PageHeaderComponent,
    FooterComponent,
    BlogArticleCardComponent
  ]
})
export class SharedModule { }
