import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';
import {ApolloQueryResult} from 'apollo-client';
import {ITestimony} from './interfaces/testimony.interface';

const GET_STAKEHOLDERS = gql`
  query GetStakeholders {
    stakeholders {
      id,
      code,
      title,
      order,
      published
    }
  }
`;

const GET_PROVIDERS = gql`
  query GetProviders {
    providers {
      id,
      code,
      title,
      order,
      published
    }
  }
`;

const GET_TAGS = gql`
  query GetTags {
    contentTags {
      id,
      code,
      title,
      order,
      published
    }
  }
`;

@Injectable()
export class AppService {
  constructor(private apollo: Apollo) {}

  public getStakeholders() {
    return this.apollo.watchQuery({
      query: GET_STAKEHOLDERS
    }).valueChanges.pipe(
      map((result: ApolloQueryResult<any>) => ({
        stakeholders: result.data.stakeholders.filter((s) => s.published),
        loading: result.loading,
        errors: result.errors
      }))
    );
  }

  public getStakeholderFilterFields() {
    return this.apollo.watchQuery({
      query: GET_STAKEHOLDERS
    }).valueChanges.pipe(
      map((result: ApolloQueryResult<any>) => ({
        filterFields: result.data.stakeholders
          .filter((s) => s.published)
          .map(s => {
            return {
              name: s.title,
              value: s.id,
              order: s.order
            }
          }),
        loading: result.loading,
        errors: result.errors
      }))
    );
  }

  public getProviders() {
    return this.apollo.watchQuery({
      query: GET_PROVIDERS
    }).valueChanges.pipe(
      map((result: ApolloQueryResult<any>) => ({
        providers: result.data.providers.filter((p) => p.published),
        loading: result.loading,
        errors: result.errors
      }))
    )
  }

  public getProviderFilterFields() {
    return this.apollo.watchQuery({
      query: GET_PROVIDERS
    }).valueChanges.pipe(
      map((result: ApolloQueryResult<any>) => ({
        filterFields: result.data.providers
          .filter((p) => p.published)
          .map(p => {
            return {
              name: p.title,
              value: p.id,
              order: p.order
            }
          }),
        loading: result.loading,
        errors: result.errors
      }))
    )
  }

  public getTags() {
    return this.apollo.watchQuery({
      query: GET_TAGS
    }).valueChanges.pipe(
      map((result: ApolloQueryResult<any>) => ({
        contentTags: result.data.contentTags.filter((ct) => ct.published),
        loading: result.loading,
        errors: result.errors
      }))
    )
  }

  public getTagFilterFields() {
    return this.apollo.watchQuery({
      query: GET_TAGS
    }).valueChanges.pipe(
      map((result: ApolloQueryResult<any>) => ({
        filterFields: result.data.contentTags
          .filter((ct) => ct.published)
          .map(ct => {
            return {
              name: ct.title,
              value: ct.id,
              order: ct.order
            }
          })
        ,
        loading: result.loading,
        errors: result.errors
      }))
    )
  }
}
