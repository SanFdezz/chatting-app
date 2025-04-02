import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { Routes } from '@angular/router';

// guards de firebase
const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);
const redirectLoggedToChat = () => redirectLoggedInTo(['chat']);

export const routes: Routes = [
  {
    path: 'home',
    // la diferencia entre loadComponent y component a secas es que el component en cuanto cargas la pagina se
    // guarda en memória y el loadComponent carga cuando se le llama a la ruta. Si nunca entras, nunca se carga.
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
    ...canActivate(redirectLoggedToChat)

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'chat',
    loadComponent: () => import('./pages/chat/chat.page').then( m => m.ChatPage),
    ...canActivate(redirectUnauthorizedToHome)
  },
  {
    path: '**',
    redirectTo:'home',
  },
];
