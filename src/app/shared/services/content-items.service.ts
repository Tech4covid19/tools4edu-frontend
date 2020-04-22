import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo, QueryRef} from 'apollo-angular';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from 'apollo-client';
import {IContentItem} from '../../interfaces/content-item.interface';

const GET_CONTENT_ITEMS = gql`
  query GetContentItems(
    $stakeholderIds: [String],
    $providerIds: [String],
    $tagIds: [String],
    $limit: Float,
    $startAt: Float
  ) {
    contentItems(
      stakeholderIds: $stakeholderIds,
      providerIds: $providerIds,
      tagIds: $tagIds,
      limit: $limit,
      startAt: $startAt,
      onlyPublished: true
    ) {
      type,
      title,
      slug,
      order,
      videoTime,
      imageUrl,
      createdAt,
      updatedAt,
      stakeholder {
        code
      }
      provider {
        code
      }
    }

  }
`;

const GET_CONTENT_ITEM = gql`
  query GetContentItem($slug: String) {
    contentItem(slug: $slug) {
      id,
      type,
      order,
      videoUrl,
      videoTime,
      imageUrl,
      title,
      text,
      createdAt,
      updatedAt,
      slug,
      published,
      stakeholder {
        id,
        title,
        code,
        order
      }
      provider {
        id,
        title,
        code,
        order
      }
      tags {
        id,
        title,
        code,
        order
      }
    }
  }
`;

@Injectable()
export class ContentItemsService {
  constructor(private apollo: Apollo) {}

  getContentItems(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: GET_CONTENT_ITEMS
    })
  }

  getContentItem(slug: string): Observable<ApolloQueryResult<IContentItem>> {
    return this.apollo.query({
      query: GET_CONTENT_ITEM,
      variables: {
        slug
      }
    })
  }

}
