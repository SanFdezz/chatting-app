import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(AngularFireAuth);
  user = signal<firebase.User | null>(null);
  // esta línea es para poder registrar y/o iniciar sesión con un nuevo usuario gracias a una cuenta de google
  // cambiar lo de firebase
  login(): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  constructor() {
    this.auth.authState.subscribe((user) => {
      this.user.set(user);
      if (user != null) {
        localStorage.setItem('username', user.displayName!);
      } else {
        localStorage.removeItem('username');
      }
    });
  }

  getStoredUsername(): string | null {
    return localStorage.getItem('username');
  }

}
