import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './screens/home/home.component';
import {ContentComponent} from './screens/content/content.component';
import {BlogComponent} from './screens/blog/blog.component';
import {FaqsComponent} from './screens/faqs/faqs.component';
import {AboutComponent} from './screens/about/about.component';
import {PrivacyComponent} from './screens/privacy/privacy.component';
import {ContentDetailComponent} from './screens/content-detail/content-detail.component';
import {ContentItemResolver} from './shared/resolvers/content-item.resolver';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'conteudo', component: ContentComponent },
  { path: 'conteudo/:slug', component: ContentDetailComponent, resolve: { queryResult: ContentItemResolver } },
  { path: 'blog', component: BlogComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'privacidade', component: PrivacyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
