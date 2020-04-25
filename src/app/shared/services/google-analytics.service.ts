import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({ providedIn: 'root' })
export class GoogleAnalyticsService {
  recordPageView(pageTitle: string, pagePath: string) {
    gtag('config', 'UA-161609255-1', {
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

  recordVideoViewStart() {

  }
}
