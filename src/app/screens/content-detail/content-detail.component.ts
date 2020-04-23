import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IContentItem} from '../../interfaces/content-item.interface';
import {IPillItem} from '../../interfaces/pill-item.interface';

@Component({
  selector: 't4e-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.scss']
})
export class ContentDetailComponent implements OnInit {

  contentItem: IContentItem
  loading: boolean;
  contentInfoBlocks: Array<{ title: string, value: string }> = [];
  tagPills: Array<IPillItem> = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(({queryResult}) => {
      this.loading = queryResult.data.loading;
      this.contentItem = queryResult.data.contentItem;
      this.contentInfoBlocks = this.getContentInfoBlocks();
      this.tagPills = [];
      if (this.contentItem.stakeholder) {
        this.tagPills.push({
            title: this.contentItem.stakeholder?.title,
            actionType: 'NAVIGATE',
            actionValue: '/conteudo?stakeholder='+this.contentItem.stakeholder?.id
        });
      }
      if (this.contentItem.provider) {
        this.tagPills.push({
          title: this.contentItem.provider?.title,
          actionType: 'NAVIGATE',
          actionValue: '/conteudo?provider='+this.contentItem.provider?.id
        })
      }
      if (this.contentItem.tags) {
        this.tagPills.push({
          title: this.contentItem.tags[0]?.title,
          actionType: 'NAVIGATE',
          actionValue: '/conteudo?tag='+this.contentItem.tags[0]?.id
        })
      }
    })


  }
  getBackgroundHeader(): string {
    if (this.contentItem.stakeholder) {
      switch(this.contentItem.stakeholder.code) {
        case 'PROFESSOR':
          return 'assets/pages/content-detail/professor-header-bg.png';

        case 'ALUNO':
          return 'assets/pages/content-detail/aluno-header-bg.png';

        case 'PAIS':
          return 'assets/pages/content-detail/pais-header-bg.png';

        default:
          return '';
      }
    } else {
      return 'assets/pages/content-detail/generic-header-bg.png';
    }
  }

  getVideoPoster(): string {
    if (this.contentItem.stakeholder) {
      switch (this.contentItem.stakeholder.code) {
        case 'PROFESSOR':
          return 'assets/pages/content-detail/professor-video-poster.png';

        case 'ALUNO':
          return 'assets/pages/content-detail/aluno-video-poster.png';

        case 'PAIS':
          return 'assets/pages/content-detail/pais-video-poster.png';

        default:
          return '';
      }
    } else {
      return '';
    }
  }

  getReadingTime() {
    const WORDS_PER_MINUTE = 223;
    const wordCount = this.contentItem.text.split(' ').length;
    const readingTime = wordCount / WORDS_PER_MINUTE;

    if (readingTime < 1) {
      return 1;
    } else {
      return readingTime.toFixed(0);
    }
  }

  getContentInfoBlocks(): Array<{ title: string, value: string }> {
    let infoBlocks = [];

    console.log('type', this.contentItem.type)

    switch(this.contentItem.type) {
      case 'CONTENT-TUTORIAL-VIDEO':
        infoBlocks.push({ title: 'Conteúdo', value: 'Vídeo' })
        infoBlocks.push({ title: 'Duração', value: this.contentItem.videoTime + ' min' })
        infoBlocks.push({ title: 'Plataforma', value: this.contentItem.provider.title })
        break;
      case 'CONTENT-ARTICLE':
        infoBlocks.push({ title: 'Conteúdo', value: 'Artigo' })
        infoBlocks.push({ title: 'Leitura', value: this.getReadingTime() + ' min' })
        infoBlocks.push({ title: 'Temática', value: this.contentItem.tags[0].title })
        break;
      default:
        return infoBlocks;
    }

    return infoBlocks;
  }



}
