import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonNav,
  IonHeader,
  IonContent,
  IonFooter,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { AuthButtonsComponent } from './shared/components/auth-buttons/auth-buttons.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonTitle,
    IonApp,
    IonRouterOutlet,
    AuthButtonsComponent,
    IonHeader,
    IonContent,
    IonFooter,
    IonToolbar,
    FooterComponent,
    HeaderComponent,
  ],
})
export class AppComponent {}
