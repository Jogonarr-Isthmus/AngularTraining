// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: 'AIzaSyA4oKrIep9HNo-EH7UaSotswS7WRWbsNS0',
  authDomain: 'bookswap-51b6a.firebaseapp.com',
  databaseURL: 'https://bookswap-51b6a.firebaseio.com',
  projectId: 'bookswap-51b6a',
  storageBucket: 'bookswap-51b6a.appspot.com',
  messagingSenderId: '789026553357',
  appId: '1:789026553357:web:f54846cbea405e4c44df44',
  measurementId: 'G-B0SEP0F8ET'
};

export const environment = {
  production: false,
  firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
