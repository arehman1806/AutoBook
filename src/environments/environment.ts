// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//It's not good programming practice to add api keys and sensitive information to github that's why dotenv files are used
// please google "dotenv files"
// since angular is a bit different I have added a development configuration in angular.json which replaces

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCRBQUU6A-mVQih1yqRwMiOs_MiA6x5Jy0',
    authDomain: 'autobook-a6bc3.firebaseapp.com',
    databaseURL: 'https://autobook-a6bc3.firebaseio.com',
    projectId: 'autobook-a6bc3',
    storageBucket: 'autobook-a6bc3.appspot.com',
    messagingSenderId: '604031941245',
    appId: '1:604031941245:web:85a65b7adcb6def1ea4f14'
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
