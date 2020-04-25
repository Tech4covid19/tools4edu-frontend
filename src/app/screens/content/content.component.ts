import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IFilters} from '../../shared/components/filters/interfaces/filters.interface';
import {QueryRef} from 'apollo-angular';
import {IContentItem} from '../../interfaces/content-item.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentItemsService} from '../../shared/services/content-items.service';
import {GoogleAnalyticsService} from '../../shared/services/google-analytics.service';

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
    private router: Router,
    private ga: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
    this.ga.recordPageView('Conteudos', '/conteudo');

    window.scroll(0,0);

    this.providerFields$ = this.appService.getProviderFilterFields().pipe(
      map(({ filterFields, loading, errors}) =>  {
        return {
          filterFields: filterFields.filter(f => f.name !== 'Tools4Edu'),
          loading,
          errors
        }
      })
    );
    this.stakeholderFields$ = this.appService.getStakeholderFilterFields();
    this.tagFields$ = this.appService.getTagFilterFields();

    this.contentItemsQueryRef = this.contentItemsService.getContentItems();

    this.contentItemsQueryRef.valueChanges.subscribe(({data, loading, errors}) => {
      if (!loading) {

        const groupedStakeholders = this.getGroupedStakeholders(data.contentItems);

        const professorArr = groupedStakeholders.filter((item: any) => item.stakeholderCode === 'PROFESSOR');
        const alunoArr = groupedStakeholders.filter((item: any) => item.stakeholderCode === 'ALUNO');
        const paisArr = groupedStakeholders.filter((item: any) => item.stakeholderCode === 'PAIS');
        const contentArr = groupedStakeholders.filter((item: any) => item.stakeholderCode === 'CONTENT-ARTICLE');

        this.contentItems = [].concat(
          professorArr.length > 0 ? professorArr[0].items.sort((a, b) => a.order - b.order) : [],
          alunoArr.length > 0 ? alunoArr[0].items.sort((a, b) => a.order - b.order) : [],
          paisArr.length > 0 ? paisArr[0].items.sort((a, b) => a.order - b.order) : [],
          contentArr.length > 0 ? contentArr[0].items.sort((a, b) => a.order - b.order) : []
        )
      }
    });

    this.activatedRoute.queryParams.subscribe((result) => {
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

  getGroupedStakeholders(contentItems: IContentItem[]): Array<{ stakeholderCode: string, items: IContentItem[]}> {
    return Object.values(contentItems.reduce((result, item) => {
      if (item.type === 'CONTENT-TUTORIAL-VIDEO') {
        if (!result[item.stakeholder.code]) {
          result[item.stakeholder.code] = {
            stakeholderCode: item.stakeholder.code,
            items: []
          }
        }

        result[item.stakeholder.code].items.push(item);

        return result;
      } else {
        if (!result['CONTENT-ARTICLE']) {
          result['CONTENT-ARTICLE'] = {
            stakeholderCode: 'CONTENT-ARTICLE',
            items: []
          }
        }

        result['CONTENT-ARTICLE'].items.push(item);

        return result;
      }
    }, {}))
  }

}
