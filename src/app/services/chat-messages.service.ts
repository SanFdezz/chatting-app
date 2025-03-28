import { Injectable } from '@angular/core';
import { getDatabase, push, ref, set } from 'firebase/database';
import { Message } from '../interfaces/message';
import { get, orderByChild, query } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class ChatMessagesService {
  db = getDatabase();
  messageListRef = ref(this.db, 'messages');

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

  getMessagesByUser() {
    const messagesQuery = query(ref(this.db, 'messages'), orderByChild('date'));

    get(messagesQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No hay mensajes todavia.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener los mensajes:', error);
      });
  }

  constructor() {}
}
