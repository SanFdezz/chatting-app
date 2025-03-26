import { Component, inject } from '@angular/core';
import { IonButton } from "@ionic/angular/standalone";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.scss'],
  imports:[IonButton]
})
export class AuthButtonsComponent  {

  auth = inject(AngularFireAuth);

  // esta línea es para poder registrar y/o iniciar sesión con un nuevo usuario gracias a una cuenta de google
  login(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.auth.signOut();
  }


  constructor() { }


}
