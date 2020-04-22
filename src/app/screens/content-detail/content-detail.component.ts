import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IContentItem} from '../../interfaces/content-item.interface';

@Component({
  selector: 't4e-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {

  contentItem: IContentItem
  loading: boolean;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({queryResult}) => {
      this.loading = queryResult.data.loading;
      this.contentItem = queryResult.data.contentItem;
    })
  }

}
