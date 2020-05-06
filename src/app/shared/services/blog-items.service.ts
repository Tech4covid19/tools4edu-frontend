import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from 'apollo-client';
import {IBlogArticle} from '../../interfaces/blog-article.interface';

const GET_BLOG_ARTICLES = gql`
  query GetBlogArticles(
    $limit: Float,
    $startAt: Float,
    $searchTerm: String
  ) {
    blogArticles(
      limit: $limit,
      startAt: $startAt,
      onlyPublished: true,
      searchTerm: $searchTerm
    ) {
      id,
      title,
      summary,
      author,
      images,
      text,
      slug,
      published,
      createdAt,
      videoUrl
    }
  }
`;

const GET_BLOG_ARTICLE = gql`
  query GetBlogArticle(
    $slug: String!
  ) {
    blogArticle(
      slug: $slug
    ) {
      id,
      title,
      summary,
      author,
      images,
      text,
      slug,
      published,
      createdAt,
      videoUrl
    }
  }
`;

@Injectable()
export class BlogItemsService {
  constructor(
    private apollo: Apollo
  ) {}

  getBlogArticles() {
    return this.apollo.watchQuery({
      query: GET_BLOG_ARTICLES
    })
  }

  getBlogArticlesForHome() {
    return this.apollo.watchQuery({
      query: GET_BLOG_ARTICLES,
      variables: {
        limit: 3
      }
    })
  }

  getBlogArticle(slug: string): Observable<ApolloQueryResult<IBlogArticle>> {
    return this.apollo.query({
      query: GET_BLOG_ARTICLE,
      variables: {
        slug
      }
    })
  }
}
