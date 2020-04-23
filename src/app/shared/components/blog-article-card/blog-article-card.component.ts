import {Component, Input, OnInit} from '@angular/core';
import {IBlogArticle} from '../../../interfaces/blog-article.interface';

@Component({
  selector: 't4e-blog-article-card',
  templateUrl: './blog-article-card.component.html',
  styleUrls: ['./blog-article-card.component.scss']
})
export class BlogArticleCardComponent implements OnInit {

  @Input() cardData: IBlogArticle;

  constructor() { }

  ngOnInit(): void {
  }

}
