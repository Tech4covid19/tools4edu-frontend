import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {ApolloQueryResult} from 'apollo-client';
import {Observable} from 'rxjs';
import {ITestimony} from '../../interfaces/testimony.interface';
import {map, tap} from 'rxjs/operators';
import {OwlOptions} from 'ngx-owl-carousel-o';

const GET_TESTIMONIES = gql`
    query GetTestimonies {
      testimonies {
        author,
        occupation,
        text,
        published
      }
    }
`;

@Component({
  selector: 't4e-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  carouselOptions: OwlOptions = {
    loop: true,
    center: true,
    stagePadding: 85,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    // dots: true,
    nav: false,
    navSpeed: 700,
    navText: ['', ''],
    margin: 40,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      },
      1220: {
        items: 3
      }
    },
  }

  testimonies$: Observable<ITestimony[]>;
  testimoniesLength: number;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.testimonies$ = this.apollo.watchQuery({
      query: GET_TESTIMONIES
    }).valueChanges.pipe(
      map((result: ApolloQueryResult<any>) => result.data.testimonies.filter((t: ITestimony) => t.published))
    )

  }

}
