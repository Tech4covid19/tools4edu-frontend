import { Component, OnInit } from '@angular/core';
import {IBlogArticle} from '../../interfaces/blog-article.interface';
import {BlogItemsService} from '../../shared/services/blog-items.service';
import {QueryRef} from 'apollo-angular';

@Component({
  selector: 't4e-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogArticlesQueryRef: QueryRef<any>;
  blogArticles: IBlogArticle[] = [];

  currentResultCount: number = 0;
  totalResultCount: number = 0;

  constructor(
    private blogItemsService: BlogItemsService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);

    this.blogArticlesQueryRef = this.blogItemsService.getBlogArticles();

    this.blogArticlesQueryRef.valueChanges.subscribe(({ data, loading, errors}) => {
      if (!loading) {
        this.blogArticles = data.blogArticles;
        this.totalResultCount = this.blogArticles.length;
        if (this.currentResultCount < this.totalResultCount) {
          this.currentResultCount = this.totalResultCount
        }
      }
    })
  }

  get blogArticlesList() {
    return this.blogArticles.filter((item, index) => index < this.currentResultCount)
  }

  handleShowMore() {
    this.currentResultCount = this.currentResultCount * 2;
  }

}
