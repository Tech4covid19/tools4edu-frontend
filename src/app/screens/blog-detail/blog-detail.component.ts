import { Component, OnInit } from '@angular/core';
import {IBlogArticle} from '../../interfaces/blog-article.interface';
import {ActivatedRoute} from '@angular/router';
import {GoogleAnalyticsService} from '../../shared/services/google-analytics.service';

@Component({
  selector: 't4e-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  blogArticle: IBlogArticle;
  blogArticleInfoBlocks: Array<{ title: string, value: string }> = [];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private ga: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);

    this.route.data.subscribe(({queryResult}) => {
      this.loading = queryResult.data.loading;
      this.blogArticle = queryResult.data.blogArticle;
      this.blogArticleInfoBlocks = this.getBlogArticleInfoBlocks();
      this.ga.recordPageView(this.blogArticle.title, `/blog/${this.blogArticle.slug}`)
    })
  }

  getHeaderDescription() {
    return `<p><strong>${this.blogArticle.author}</strong></p>`
  }

  getBlogArticleInfoBlocks(): Array<{ title: string, value: string }> {
    let infoBlocks = [];

    infoBlocks.push({title: 'Conteúdo', value: 'Artigo'})
    infoBlocks.push({title: 'Leitura', value: this.getReadingTime() + ' min'})

    return infoBlocks;
  }

  getReadingTime() {
    const WORDS_PER_MINUTE = 223;
    const wordCount = this.blogArticle.text.split(' ').length;
    const readingTime = wordCount / WORDS_PER_MINUTE;

    if (readingTime < 1) {
      return 1;
    } else {
      return readingTime.toFixed(0);
    }
  }
}
