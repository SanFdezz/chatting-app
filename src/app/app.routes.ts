import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from './pages/login/login.page';
import { ChatPage } from './pages/chat/chat.page';
import { SignupPage } from './pages/signup/signup.page';

export const routes: Routes = [
  {
    path: 'home',
    // loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    component:HomePage,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    // loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
    component:LoginPage,
  },
  {
    path: 'chat',
    // loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
    component: ChatPage,
  },
  {
    path: 'signup',
    // loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
    component:SignupPage,
  },
];
