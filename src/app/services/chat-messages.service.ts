import { Injectable, signal } from '@angular/core';
import { getDatabase, push, ref, set } from 'firebase/database';
import { Message } from '../interfaces/message';
import { onValue, orderByChild, query } from '@angular/fire/database';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class ChatMessagesService {

  db = getDatabase();
  messageListRef = ref(this.db, 'messages');
  user = getAuth()
  messages = signal<Message[]>([]);

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

  listenToMessagesByUser() {
    const messagesQuery = query(ref(this.db, 'messages'), orderByChild('date')); // Ajusta el orden según lo necesites

    onValue(messagesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const allMessages: Message[] = [];

        snapshot.forEach((childSnapshot) => {
          allMessages.push(childSnapshot.val().message);
        });
        // console.log(allMessages);
        this.messages.set(allMessages);
      } else {
        this.messages.set([]);
      }
    });
  }

  constructor() {}
}
