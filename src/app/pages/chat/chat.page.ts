import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
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
  IonInfiniteScroll, IonAlert
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { ChatMessagesService } from 'src/app/services/chat-messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonAlert,
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
  constructor() { }

  myForm = new FormGroup({
    message: new FormControl<string>('', Validators.required),
  });

  user = inject<AuthService>(AuthService);
  chatMessages = inject<ChatMessagesService>(ChatMessagesService);
  infiniteScrollDisabled: boolean = true;
  alertDelete: WritableSignal<boolean> = signal(true);

  sendMessage() {
    const message = this.myForm.get('message')?.value as string;
    if(message.trim()!==''){
      const username = this.user.username() as string;
      this.chatMessages.sendMessage(message, username);
      this.myForm.reset();
    }
  }

  obtainOlderMessages(event: any) {
    setTimeout(() => {
      this.chatMessages.loadMessages();
      event.target.complete();
    }, 1000);

    if (this.chatMessages.messages().length < this.chatMessages.amountOfMessages()) {
      this.chatMessages.loadMessages();
      event.target.complete();
      event.target.disabled = true;
    }

  }

  alertButtons =
    [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          this.alertDelete.set(false);
        },
      },
      {
        text: 'Confirm',
        role: 'confirm',
        handler: () => {
          this.chatMessages.deleteMessages();
        },
      },
    ];


  ngOnInit() {
    this.chatMessages.loadMessages();
    setTimeout(() => {
      this.infiniteScrollDisabled = false;
    }, 3000);
  }

}
