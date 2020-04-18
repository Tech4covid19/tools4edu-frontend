import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { PageHeaderComponent } from './page-header/page-header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    NavbarComponent,
    PageHeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    PageHeaderComponent,
    FooterComponent
  ]
})
export class SharedModule { }
