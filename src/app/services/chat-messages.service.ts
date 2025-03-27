import { Injectable } from '@angular/core';
import { getDatabase, push, ref, set } from 'firebase/database';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatMessagesService {
  db = getDatabase();
  messageListRef = ref(this.db, 'messages');
  newMessageRef = push(this.messageListRef);

  sendMessage(newMessage: string, username: string) {
    const date = new Date().toString();
    const message: Message = {
      user: username,
      message: newMessage,
      date: date,
    };
    set(this.newMessageRef, {
      message,
    });
    console.log('Mensaje enviado!');
  }

  constructor() {}
}
