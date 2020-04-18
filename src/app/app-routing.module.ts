import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './screens/home/home.component';
import {ContentComponent} from './screens/content/content.component';
import {BlogComponent} from './screens/blog/blog.component';
import {FaqsComponent} from './screens/faqs/faqs.component';
import {AboutComponent} from './screens/about/about.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'conteudo', component: ContentComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'sobre', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
