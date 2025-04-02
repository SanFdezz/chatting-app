import { Injectable, signal, WritableSignal } from '@angular/core';
import { getDatabase, push, ref, set } from 'firebase/database';
import { Message } from '../interfaces/message';
import {
  limitToLast,
  onValue,
  orderByChild,
  query,
  remove,
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
  amountOfMessages:WritableSignal<number> = signal(10)

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
    console.log(this.amountOfMessages())
    let messagesQuery = query(
      ref(this.db, 'messages'),
      orderByChild('date'),
      limitToLast(this.amountOfMessages())
    );

    this.amountOfMessages.set(this.amountOfMessages()+10);

    onValue(messagesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const allMessages: Message[] = [];
        snapshot.forEach((childSnapshot) => {
          const message = childSnapshot.val().message;
          allMessages.push(message);
        });

        this.messages.set(allMessages);

      } else {
        this.messages.set([]);
      }
    });
  }

  deleteMessages(){
    remove(ref(this.db, "/"))
      .then(() => console.log("eliminada"))
      .catch((error) => console.error(error));
  }

  constructor() {}
}
