import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.scss'],
  imports: [IonButton],
})
export class AuthButtonsComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  login() {
    this.auth.login().then(() => this.router.navigateByUrl('/chat'));
  }

  logout() {
    localStorage.removeItem('username');
    this.auth.logout().then(() => this.router.navigateByUrl('/home'));
  }

  isLogged(): boolean {
    return this.auth.getStoredUsername() ? true : false;
  }
}
