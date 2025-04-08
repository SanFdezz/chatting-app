// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBm8gS_4Ma-1DTHuv6YUC_Dg76jd8H2tmA',
    authDomain: 'proyecto-chat-sfa.firebaseapp.com',
    databaseURL: 'https://proyecto-chat-sfa-default-rtdb.firebaseio.com/',
    projectId: 'proyecto-chat-sfa',
    storageBucket: 'proyecto-chat-sfa.firebasestorage.app',
    messagingSenderId: '507035982788',
    appId: '1:507035982788:web:dfe1e7f21a69a25b942291',
  },
};

// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);
