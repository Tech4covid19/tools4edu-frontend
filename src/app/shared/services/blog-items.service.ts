import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const GET_BLOG_ARTICLES = gql`
  query GetBlogArticles(
    $limit: Float,
    $startAt: Float
  ) {
    blogArticles(
      limit: $limit,
      startAt: $startAt,
      onlyPublished: true
    ) {
      id,
      title,
      summary,
      author,
      images,
      text,
      slug,
      published,
      createdAt
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
}
