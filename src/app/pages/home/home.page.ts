import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonNav } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  auth = inject(AuthService);

}
