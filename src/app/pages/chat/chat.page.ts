import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonInput,
  IonInfiniteScrollContent,
  IonInfiniteScroll,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { ChatMessagesService } from 'src/app/services/chat-messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScroll,
    IonInfiniteScrollContent,
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
export class ChatPage implements OnInit {
  constructor() {}

  myForm = new FormGroup({
    message: new FormControl<string>('', Validators.required),
  });

  user = inject(AuthService);
  chatMessages = inject(ChatMessagesService);

  sendMessage() {
    const message = this.myForm.get('message')?.value as string;
    const username = this.user.username() as string;
    this.chatMessages.sendMessage(message, username);
    this.myForm.reset();
  }

  obtainOlderMessages(event: any) {
    console.log(this.chatMessages.lastMessageDate);
    this.chatMessages.loadMessages(this.chatMessages.lastMessageDate);
    event.target.complete();

    if (this.chatMessages.messages().length == 0) {
      event.target.disabled = true;
    }
  }

  ngOnInit() {
    this.chatMessages.loadMessages(undefined);
  }
}
