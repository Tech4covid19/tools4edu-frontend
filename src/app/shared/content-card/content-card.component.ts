import {Component, Input, OnInit} from '@angular/core';
import {IContentItem} from '../../interfaces/content-item.interface';

@Component({
  selector: 't4e-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent implements OnInit {

  @Input() contentItem: IContentItem = {};

  constructor() { }

  ngOnInit(): void {

  }

  getProviderImage() {
    switch(this.contentItem.provider.code) {
      case 'TEAMS':
        return 'card-provider-teams.png';
      case 'ZOOM':
        return 'card-provider-zoom.png'
      default:
        return '';
    }
  }

  getBackgroundImage() {
    if (this.contentItem.imageUrl) {
      return 'url('+ this.contentItem.imageUrl +')'
    } else {
      switch(this.contentItem.stakeholder.code) {
        case 'PROFESSOR':
          return 'url(/assets/card/card-content-professor.png)';
        case 'ALUNO':
          return 'url(/assets/card/card-content-aluno.png)';
        case 'PAIS':
          return 'url(/assets/card/card-content-ee.png)';
      }
    }
  }

}
