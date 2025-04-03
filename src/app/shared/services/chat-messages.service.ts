import { Injectable, signal, WritableSignal } from '@angular/core';
import { getDatabase, push, ref, set } from 'firebase/database';

import { getAuth } from '@angular/fire/auth';
import {
  get,
  limitToLast,
  orderByChild,
  query,
  remove,
} from '@angular/fire/database';
import { Message } from 'src/app/core/interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class ChatMessagesService {
  db = getDatabase();
  messageListRef = ref(this.db, 'messages');
  user = getAuth();
  messages:WritableSignal<Message[]> = signal([]);
  amountOfMessages: WritableSignal<number> = signal(10);

  sendMessage(newMessage: string, username: string, location:string): void {
    const date = new Date().toString();
    const message: Message = {
      user: username,
      message: newMessage,
      date: date,
      location:location,
    };

    // RECUERDA!!!! El newMessageRef se pone dentro de la funcion enviar ya que si no, se sobreescribe todo el rato el mensaje
    const newMessageRef = push(this.messageListRef);
    set(newMessageRef,
      message,
    );
    this.messages.update((_messages) => [..._messages, message]);
  }

  loadMessages(): void {
    let messagesQuery = query(
      ref(this.db, 'messages'),
      orderByChild('date'),
      limitToLast(this.amountOfMessages()),
    );

    this.amountOfMessages.set(this.amountOfMessages() + 10);

    get(messagesQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const allMessages: Message[] = [];
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val();
          allMessages.push(message);
        });

        this.messages.set(allMessages);
      } else {
        this.messages.set([]);
      }
    });
  }

  deleteMessages(): void {
    remove(ref(this.db, '/'))
      .then(() => console.log('eliminada'))
      .catch((error) => console.error(error));
  }
}
