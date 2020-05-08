import { Component } from '@angular/core';
import * as FullStory from '@fullstory/browser';
import { environment } from '../environments/environment';

@Component({
  selector: 't4e-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    FullStory.init({
      orgId: 'V2PWV',
      devMode: !environment.production
    })
  }

  title = 'tools4edu-frontend';
}
