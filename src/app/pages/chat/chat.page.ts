import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonInput,
  IonIcon,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { ChatMessagesService } from 'src/app/services/chat-messages.service';
import { Message } from 'src/app/interfaces/message';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonInput,
    IonItem,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ChatPage {
  constructor() {}

  myForm = new FormGroup({
    message:new FormControl('')
  });

  user = inject(AuthService);
  chatMessages = inject(ChatMessagesService);


  validMessage(message: string): boolean {
    return message ? true : false;
  }

  createBetterMessage(){
    const text : string = this.myForm.get('message')?.value as string;
    const username:string = this.user.username() as string;
    const date = new Date().toString();
    const message:Message = {
      user:username,
      message:text,
      date:date,
    }
    this.chatMessages.sendMessage(message);
  }

}
