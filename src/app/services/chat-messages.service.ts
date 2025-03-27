import { inject, Injectable } from '@angular/core';
import { Database } from '@angular/fire/database';
import { getDatabase, push, ref, set } from 'firebase/database';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {


  db = getDatabase()
  messageListRef = ref(this.db,'messages');
  newMessageRef = push(this.messageListRef);

  sendMessage(message:Message){
    set(this.newMessageRef, {
      message
    });
    console.log('Mensaje enviado!')
  }



  constructor() {}



}
