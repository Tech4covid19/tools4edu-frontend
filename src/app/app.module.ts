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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
