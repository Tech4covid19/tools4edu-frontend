import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 't4e-blog-article-card',
  templateUrl: './blog-article-card.component.html',
  styleUrls: ['./blog-article-card.component.scss']
})
export class BlogArticleCardComponent implements OnInit {

  @Input() cardData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
