import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 't4e-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  drawerOpened: boolean;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
    this.renderer.removeClass(document.body, 't4e-scroll-lock');

    if (this.drawerOpened) {
      this.renderer.addClass(document.body, 't4e-scroll-lock');
    }
  }

  navigateOut() {
    this.drawerOpened = false;
    this.renderer.removeClass(document.body, 't4e-scroll-lock');
  }

}
