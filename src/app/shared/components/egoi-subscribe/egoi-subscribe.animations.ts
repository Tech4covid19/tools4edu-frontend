import {animate, style, transition, trigger} from '@angular/animations';

export const fadeAnimation = trigger(
  'fadeAnimation',
  [
    transition(
      ':enter',
      [
        style({ opacity: 0 }),
        animate('1s ease-out',
          style({ opacity: 1 }))
      ]
    ),
    transition(
      ':leave',
      [
        style({ opacity: 1 }),
        animate('1s ease-in',
          style({ opacity: 0 }))
      ]
    )
  ]
)
