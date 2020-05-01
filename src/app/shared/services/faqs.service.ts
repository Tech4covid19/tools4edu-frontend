import {Injectable} from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';
import gql from 'graphql-tag';

const GET_FAQ_ITEMS = gql`
  query GetFaqItems(
    $stakeholderIds: [String],
    $providerIds: [String],
    $limit: Float,
    $startAt: Float,
    $searchTerm: String
  ) {
    faqs(
      stakeholderIds: $stakeholderIds,
      providerIds: $providerIds,
      limit: $limit,
      startAt: $startAt,
      onlyPublished: true,
      searchTerm: $searchTerm
    ) {
      id,
      order,
      question,
      answer,
      published,
      stakeholder {
        id,
        title
        code
      }
      provider {
        id,
        title
        code
      }
    }
  }
`

@Injectable()
export class FaqsService {
  constructor(
    private apollo: Apollo
  ) {}

  getFaqs(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: GET_FAQ_ITEMS,
      variables: {
        providerIds: [],
        stakeholderIds: [],
        limit: 200,
        startAt: 0,
        searchTerm: ''
      }
    })
  }

}
