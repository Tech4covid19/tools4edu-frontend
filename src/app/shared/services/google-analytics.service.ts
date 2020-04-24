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

  recordVideoViewStart() {

  }
}
