import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

declare let gtag: Function;

@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  constructor() {
    gtag('config', environment.googleAnalyticsId);
  }

  recordPageView(pageTitle: string, pagePath: string) {
    gtag('config', environment.googleAnalyticsId, {
      'page_title': pageTitle,
      'page_path': pagePath
    })
  }

  recordEvent(eventCategory, eventAction, eventLabel) {
    gtag('event', eventAction, {
      'event_category': eventCategory,
      'event_label': eventLabel
    });
  }
}
