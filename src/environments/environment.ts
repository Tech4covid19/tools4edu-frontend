// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const SERVER_URL = 'https://cnom3x70jk.execute-api.eu-central-1.amazonaws.com/dev'

export const environment = {
  production: false,
  graphQLApiUrl: SERVER_URL + '/graphql',
  googleAnalyticsId: 'UA-161609255-2',
  egoi: {
    url: 'https://api.egoiapp.com',
    key: 'fcc1d75b9a2d5243ca988276650c4707047e1dee',
    subscribersList: "8"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
