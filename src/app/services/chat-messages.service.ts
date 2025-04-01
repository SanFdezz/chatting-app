import { Injectable, signal, WritableSignal } from '@angular/core';
import { getDatabase, push, ref, set } from 'firebase/database';
import { Message } from '../interfaces/message';
import {
  limitToLast,
  onValue,
  orderByChild,
  query,
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
  amountOfMessages:WritableSignal<number> = signal(3)

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

  loadMessages() {

    let messagesQuery = query(
      ref(this.db, 'messages'),
      orderByChild('date'),
      limitToLast(this.amountOfMessages())
    );

    this.amountOfMessages()+1;

    onValue(messagesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const allMessages: Message[] = [];
        let lastDate = this.lastMessageDate;

        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val().message;
          // console.log(message)
          allMessages.push(message);
          lastDate = message.date;
        });

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
