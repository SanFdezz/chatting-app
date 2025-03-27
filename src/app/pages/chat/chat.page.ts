import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabButton, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Database } from '@angular/fire/database';
import { ChatMessagesService } from 'src/app/services/chat-messages.service';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ChatPage{

  constructor() { }

  user = inject(AuthService);
  chatMessages = inject(ChatMessagesService);

  mensaje:Message = {
    user:'Sandra',
    message:'Hola soy sandra',
    localization:'Valencia',
  }
}
