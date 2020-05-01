import { Component, OnInit } from '@angular/core';
import {IBlogArticle} from '../../interfaces/blog-article.interface';
import {BlogItemsService} from '../../shared/services/blog-items.service';
import {QueryRef} from 'apollo-angular';
import {GoogleAnalyticsService} from '../../shared/services/google-analytics.service';
import {listAnimation} from './blog.animations';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 't4e-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  animations: [listAnimation]
})
export class BlogComponent implements OnInit {

  blogArticlesQueryRef: QueryRef<any>;
  blogArticles: IBlogArticle[] = [];

  $searchTerm: BehaviorSubject<string> = new BehaviorSubject<string>('');

  contentLoading: boolean = true;

  currentResultCount: number = 6;
  totalResultCount: number = 0;

  constructor(
    private blogItemsService: BlogItemsService,
    private ga: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
    this.ga.recordPageView('Blog', '/blog');

    window.scroll(0,0);

    this.blogArticlesQueryRef = this.blogItemsService.getBlogArticles();

    this.blogArticlesQueryRef.valueChanges.subscribe(({ data, loading, errors}) => {
      if (!loading && data.blogArticles) {
        this.blogArticles = data.blogArticles.sort((a: IBlogArticle, b: IBlogArticle) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.totalResultCount = this.blogArticles.length;

        this.contentLoading = false;

        if (this.currentResultCount < this.totalResultCount) {
          this.currentResultCount = this.totalResultCount
        }
      }
    })

    this.$searchTerm.subscribe((searchTerm) => {
      this.contentLoading = true;

      this.blogArticlesQueryRef.refetch({
        searchTerm
      }).then(() => {
        this.contentLoading = false;
      });
    })
  }

  get blogArticlesList() {
    return this.blogArticles.filter((item, index) => index < this.currentResultCount)
  }

  handleShowMore() {
    this.currentResultCount = this.currentResultCount * 2;
  }

}
