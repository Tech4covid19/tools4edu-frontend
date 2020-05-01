import {Component, Inject, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {IFilters} from '../../shared/components/filters/interfaces/filters.interface';
import {AppService} from '../../app.service';
import {QueryRef} from 'apollo-angular';
import {FaqsService} from '../../shared/services/faqs.service';
import {IFaqItem} from '../../interfaces/faq-item.interface';
import {map} from 'rxjs/operators';
import {GoogleAnalyticsService} from '../../shared/services/google-analytics.service';
import {listAnimation} from './faq.animations';
import {WINDOW} from '../../shared/services/window.service';

@Component({
  selector: 't4e-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
  animations: [listAnimation]
})
export class FaqsComponent implements OnInit {

  providerFields$: Observable<IFilters>;
  stakeholderFields$: Observable<IFilters>;

  selectedProviders$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  selectedStakeholders$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  totalSelectedFilters: number = 0;

  faqItemsQueryRef: QueryRef<any>;
  faqItems: IFaqItem[] = [];

  contentLoading: boolean = true;
  filterDrawerOpened: boolean = false;

  currentResultCount: number = 6;
  totalResultCount: number = 0;


  constructor(
    private appService: AppService,
    private faqsService: FaqsService,
    private ga: GoogleAnalyticsService,
    @Inject(WINDOW) public window: Window
  ) { }

  ngOnInit(): void {
    this.ga.recordPageView('Faqs', '/faqs');

    window.scroll(0,0);

    this.providerFields$ = this.appService.getProviderFilterFields()
    this.stakeholderFields$ = this.appService.getStakeholderFilterFields();

    this.faqItemsQueryRef = this.faqsService.getFaqs();

    this.faqItemsQueryRef.valueChanges.subscribe(({ data, loading, errors}) => {
      if (!loading) {
        this.contentLoading = false;
        this.faqItems = data.faqs
        this.totalResultCount = this.faqItems.length;
      }
    });

    combineLatest(
      this.selectedProviders$,
      this.selectedStakeholders$,
      this.searchTerm$
    ).pipe(
      map(([providers, stakeholders, searchTerm]) => {
        return [
          providers.filter(v => v.length > 0),
          stakeholders.filter(v => v.length > 0),
          searchTerm
        ]
      })
    ).subscribe(([ providerIds, stakeholderIds, searchTerm]) => {
      this.totalSelectedFilters = providerIds.length + stakeholderIds.length;

      this.faqItems = [];
      this.contentLoading = true;

      this.faqItemsQueryRef.refetch({
        providerIds,
        stakeholderIds,
        searchTerm
      }).then(() => {
        this.contentLoading = false
      })

      this.currentResultCount = 6;
    })
  }

  openFilterDrawer() {
    this.filterDrawerOpened = true;
  }

  clearFilters() {
    this.selectedStakeholders$.next([]);
    this.selectedProviders$.next([]);
  }

  get faqItemList() {
    return this.faqItems.filter((item, index) => index < this.currentResultCount)
  }

  handleShowMore() {
    this.currentResultCount = this.currentResultCount * 2;
  }

}
