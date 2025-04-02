import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonNav, IonButton, IonModal, IonButtons, IonItem, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonInput, IonItem, IonButtons, IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  auth = inject(AuthService);

}
