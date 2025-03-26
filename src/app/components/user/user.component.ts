import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})

export class UserComponent  {

  private auth = inject(AngularFireAuth);
  userSubscription: Subscription;
  userData: firebase.default.User | null = null;

  constructor() {
    this.userSubscription = this.auth.authState.subscribe((user) => {
      this.userData = user;
      console.log(user);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
