import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonRouterOutlet,IonNav,IonHeader,IonContent } from '@ionic/angular/standalone';
import { AuthButtonsComponent } from "./shared/auth-buttons/auth-buttons.component";
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, AuthButtonsComponent,IonHeader,IonContent],
})
export class AppComponent {

}
