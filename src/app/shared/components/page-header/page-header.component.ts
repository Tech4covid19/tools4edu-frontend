import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 't4e-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() isInnerPage: boolean;
  @Input() backgroundImage: string;

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() backLabel: string = '';
  @Input() backUrl: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate([this.backUrl]);
  }

}
