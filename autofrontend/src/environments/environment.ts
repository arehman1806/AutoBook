// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// It's not good programming practice to add api keys and sensitive information to github that's why dotenv files are used
// please google "dotenv files"
// since angular is a bit different I have added a development configuration in angular.json which replaces

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBlfZNxYxqOrS7HrVJBK9kfCezS6r4-1Qo',
    authDomain: 'autobook-e740b.firebaseapp.com',
    databaseURL: 'https://autobook-e740b.firebaseio.com',
    projectId: 'autobook-e740b',
    storageBucket: 'autobook-e740b.appspot.com',
    messagingSenderId: '919990050610',
    appId: '1:919990050610:web:e6c56f256a75aeccd2412b'

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
