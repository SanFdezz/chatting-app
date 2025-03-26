import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    // la diferencia entre loadComponent y component a secas es que el component en cuanto cargas la pagina se
    // guarda en memória y el loadComponent carga cuando se le llama a la ruta. Si nunca entras, nunca se carga.
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: '**',
    redirectTo:'home',
  },
];
