import { Component, OnInit } from '@angular/core';
import {GoogleAnalyticsService} from '../../shared/services/google-analytics.service';

@Component({
  selector: 't4e-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(
    private ga: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
    this.ga.recordPageView('Sobre', '/sobre');
  }

}
