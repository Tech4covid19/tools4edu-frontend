import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IFilters} from '../../shared/components/filters/interfaces/filters.interface';
import {QueryRef} from 'apollo-angular';
import {IContentItem} from '../../interfaces/content-item.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentItemsService} from '../../shared/services/content-items.service';

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

  totalSelectedFilters: number = 0;

  contentItemsQueryRef: QueryRef<any>;

  contentItems: IContentItem[] = [];

  filterDrawerOpened: boolean = false;

  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private contentItemsService: ContentItemsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);

    this.providerFields$ = this.appService.getProviderFilterFields()
    this.stakeholderFields$ = this.appService.getStakeholderFilterFields();
    this.tagFields$ = this.appService.getTagFilterFields();

    this.contentItemsQueryRef = this.contentItemsService.getContentItems();

    this.contentItemsQueryRef.valueChanges.subscribe(({data, loading, errors}) => {
      if (!loading) {
        this.contentItems = data.contentItems;
      }
    });

    this.activatedRoute.queryParams.subscribe((result) => {
      console.log('params', result)
      if (result.provider) {
        this.selectedProviders$.next([result.provider])
      }

      if (result.stakeholder) {
        this.selectedStakeholders$.next([result.stakeholder])
      }

      if (result.tag) {
        this.selectedTags$.next([result.tag])
      }
    })

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
      this.totalSelectedFilters = providerIds.length + stakeholderIds.length + tagIds.length;

      this.contentItemsQueryRef.refetch({
        providerIds,
        stakeholderIds,
        tagIds
      })
    })

  }

  openFilterDrawer() {
    this.filterDrawerOpened = true;
  }

  clearFilters() {
    // Remove Query Params
    this.router.navigate(
      ['.'],
      { relativeTo: this.activatedRoute, queryParams: {} }
    ).then(() => {
      this.selectedTags$.next([])
      this.selectedStakeholders$.next([])
      this.selectedProviders$.next([]);
    });
  }

}
