import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'proyecto-chat-sfa',
        appId: '1:507035982788:web:dfe1e7f21a69a25b942291',
        storageBucket: 'proyecto-chat-sfa.firebasestorage.app',
        apiKey: 'AIzaSyBm8gS_4Ma-1DTHuv6YUC_Dg76jd8H2tmA',
        authDomain: 'proyecto-chat-sfa.firebaseapp.com',
        messagingSenderId: '507035982788',
        measurementId: 'G-Z7SYDHFHYX',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({ projectId: "proyecto-chat-sfa", appId: "1:507035982788:web:dfe1e7f21a69a25b942291", storageBucket: "proyecto-chat-sfa.firebasestorage.app", apiKey: "AIzaSyBm8gS_4Ma-1DTHuv6YUC_Dg76jd8H2tmA", authDomain: "proyecto-chat-sfa.firebaseapp.com", messagingSenderId: "507035982788", measurementId: "G-Z7SYDHFHYX" })), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService]})
