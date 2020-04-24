import { Component, OnInit } from '@angular/core';
import {GoogleAnalyticsService} from '../../shared/services/google-analytics.service';

@Component({
  selector: 't4e-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  constructor(
    private ga: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
    this.ga.recordPageView('Privacidade', '/privacidade');

    window.scroll(0,0);
  }

}
