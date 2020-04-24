import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {ApolloQueryResult} from 'apollo-client';
import {ITestimony} from '../../interfaces/testimony.interface';
import {map} from 'rxjs/operators';
import {OwlOptions} from 'ngx-owl-carousel-o';
import {IBlogArticle} from '../../interfaces/blog-article.interface';
import {BlogItemsService} from '../../shared/services/blog-items.service';
import {GoogleAnalyticsService} from '../../shared/services/google-analytics.service';

const GET_TESTIMONIES = gql`
    query GetTestimonies {
      testimonies {
        author,
        occupation,
        text,
        published
      }
    }
`;

@Component({
  selector: 't4e-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  testimoniesCarouselOptions: OwlOptions = {
    loop: true,
    center: true,
    stagePadding: 85,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    // dots: true,
    nav: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 40,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      },
      1220: {
        items: 3
      }
    },
  };

  blogCarouselOptions: OwlOptions = {
    loop: true,
    center: true,
    stagePadding: 85,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    // dots: true,
    nav: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 40,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      },
      1220: {
        items: 3
      }
    },
  };

  testimonies: ITestimony[];
  testimoniesLoading: boolean;

  blogArticles: IBlogArticle[];
  blogArticlesLoading: boolean;

  constructor(
    private apollo: Apollo,
    private blogItemsService: BlogItemsService,
    private ga: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
    this.ga.recordPageView('Home', '/');

    this.apollo.watchQuery({
      query: GET_TESTIMONIES
    }).valueChanges.pipe(
      map((result: ApolloQueryResult<any>) => ({
        testimonies: result.data.testimonies.filter((t: ITestimony) => t.published),
        loading: result.loading,
        errors: result.errors
      }))
    ).subscribe(({ testimonies, loading, errors}) => {
      this.testimoniesLoading = loading;
      this.testimonies = testimonies;
    });

    this.blogItemsService.getBlogArticlesForHome().valueChanges.pipe(
      map((result: ApolloQueryResult<any>) => ({
        blogArticles: result.data.blogArticles,
        loading: result.loading,
        errors: result.errors
      }))
    ).subscribe(({ blogArticles, loading, errors}) => {
      this.blogArticlesLoading = loading;
      this.blogArticles = blogArticles;
    })
  }

}
