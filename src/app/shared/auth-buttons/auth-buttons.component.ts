import { Component, OnInit } from '@angular/core';
import { IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.scss'],
  imports:[IonButton]
})
export class AuthButtonsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
