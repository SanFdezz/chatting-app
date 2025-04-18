import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonInput,
  IonItem,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChatMessagesService } from 'src/app/shared/services/chat-messages.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    IonAlert,
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
  private readonly authService = inject(AuthService);
  private readonly chatService = inject(ChatMessagesService);

  infiniteScrollDisabled: boolean = true;
  alertDelete: WritableSignal<boolean> = signal(true);
  currentLocation: string = '';

  myForm = new FormGroup({
    message: new FormControl<string>('', Validators.required),
  });

  alertButtons = [
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
        this.chatService.deleteMessages();
      },
    },
  ];

  messages = this.chatService.messages;
  user = this.authService.getStoredUsername;

  ngOnInit(): void {
    this.getCurrentLocation();
    this.chatService.loadMessages();
    setTimeout(() => {
      this.infiniteScrollDisabled = false;
    }, 3000);
  }

  sendMessage(): void {
    const message = this.myForm.get('message')?.value as string;
    if (message.trim() !== '') {
      const username = this.authService.user()?.displayName!;
      this.chatService.sendMessage(message, username, this.currentLocation);
      this.myForm.reset();
    }
  }

  obtainOlderMessages(event: any): void {
    setTimeout(() => {
      this.chatService.loadMessages();
      event.target.complete();
    }, 1000);

    if (
      this.chatService.messages().length < this.chatService.amountOfMessages()
    ) {
      this.chatService.loadMessages();
      event.target.complete();
      event.target.disabled = true;
    }
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.coords.latitude}&lon=${coordinates.coords.longitude}&format=json`,
    );
    const data = await response.json();
    this.currentLocation = data.address.city + ', ' + data.address.country;
  }
}
