import { Injectable, signal } from '@angular/core';
import { getDatabase, push, ref, set } from 'firebase/database';
import { Message } from '../interfaces/message';
import {
  endBefore,
  limitToFirst,
  onValue,
  orderByChild,
  query,
  startAfter,
} from '@angular/fire/database';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ChatMessagesService {
  db = getDatabase();
  messageListRef = ref(this.db, 'messages');
  user = getAuth();
  messages = signal<Message[]>([]);
  lastMessageDate: string | undefined = undefined;
  pageSize = 10;

  sendMessage(newMessage: string, username: string) {
    const date = new Date().toString();
    const message: Message = {
      user: username,
      message: newMessage,
      date: date,
    };
    // RECUERDA!!!! El newMessageRef se pone dentro de la funcion enviar ya que si no, se sobreescribe todo el rato el mensaje
    const newMessageRef = push(this.messageListRef);
    set(newMessageRef, {
      message,
    });
  }

  loadMessages(lastLoadedMessage?: string) {
    let messagesQuery;

    if (lastLoadedMessage !== undefined) {
      messagesQuery = query(
        ref(this.db, 'messages'),
        orderByChild('date'),
        endBefore(lastLoadedMessage),
        limitToFirst(this.pageSize)
      );
    } else {
      messagesQuery = query(
        ref(this.db, 'messages'),
        orderByChild('date'),
        limitToFirst(this.pageSize)

      );
    }

    onValue(messagesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const allMessages: Message[] = [];
        let lastDate = this.lastMessageDate;

        if (this.lastMessageDate !== undefined) {
          snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val().message;
            allMessages.push(message);
            lastDate = message.date;
          });
        } else {
          snapshot.forEach((childSnapshot) => {
            const message = childSnapshot.val().message;
            allMessages.push(message);
            lastDate = message.date;
          });
        }
        this.messages.set(allMessages);
        this.lastMessageDate = lastDate;
        console.log(this.messages());
      } else {
        this.messages.set([]);
      }
    });
  }

  constructor() {}
}
