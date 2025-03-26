import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonRouterOutlet,IonNav,IonHeader,IonContent,IonFooter,IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { AuthButtonsComponent } from "./shared/auth-buttons/auth-buttons.component";
import { FooterComponent } from "./shared/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonTitle, IonApp, IonRouterOutlet, AuthButtonsComponent, IonHeader, IonContent, IonFooter, IonToolbar, FooterComponent],
})
export class AppComponent {

}
