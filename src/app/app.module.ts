import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { HomeComponent } from './screens/home/home.component';
import { ContentComponent } from './screens/content/content.component';
import { BlogComponent } from './screens/blog/blog.component';
import { FaqsComponent } from './screens/faqs/faqs.component';
import { AboutComponent } from './screens/about/about.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContentComponent,
    BlogComponent,
    FaqsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
