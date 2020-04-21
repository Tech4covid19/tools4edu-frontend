import {Component, OnDestroy, OnInit} from '@angular/core';
import gql from 'graphql-tag';
import {AppService} from '../../app.service';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {IProvider} from '../../interfaces/provider.interface';
import {IStakeholder} from '../../interfaces/stakeholder.interface';
import {ITag} from '../../interfaces/tag.interface';
import {filter, map} from 'rxjs/operators';
import {IFilterField, IFilters} from '../../shared/filters/interfaces/filters.interface';
import {Apollo, QueryRef} from 'apollo-angular';
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

@Component({
  selector: 't4e-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  providerFields$: Observable<IFilters>;
  stakeholderFields$: Observable<IFilters>;
  tagFields$: Observable<IFilters>;

  selectedProviders$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  selectedStakeholders$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  selectedTags$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  contentItemsQueryRef: QueryRef<any>;
  contentItemsCountQueryRef: QueryRef<any>;

  contentItems: IContentItem[] = [];

  constructor(
    private appService: AppService,
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.providerFields$ = this.appService.getProviderFilterFields()
    this.stakeholderFields$ = this.appService.getStakeholderFilterFields();
    this.tagFields$ = this.appService.getTagFilterFields();

    this.contentItemsQueryRef = this.apollo.watchQuery({
      query: GET_CONTENT_ITEMS
    })

    this.contentItemsQueryRef.valueChanges.subscribe(({data, loading, errors}) => {
      if (!loading) {
        console.log('content items', data.contentItems);
        this.contentItems = data.contentItems;
      }
    });

    combineLatest(
      this.selectedProviders$,
      this.selectedStakeholders$,
      this.selectedTags$
    ).pipe(
      map(([ providers, stakeholders, tags]) => {
        return [
          providers.filter(v => v.length > 0),
          stakeholders.filter(v => v.length > 0),
          tags.filter(v => v.length > 0)
        ]
      })
    ).subscribe(([providerIds, stakeholderIds, tagIds]) => {
      console.log('providerIds', providerIds);
      console.log('stakeholderIds', stakeholderIds);
      console.log('tagIds', tagIds);

      this.contentItemsQueryRef.refetch({
        providerIds,
        stakeholderIds,
        tagIds
      })
    })

  }

}
