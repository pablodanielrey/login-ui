import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { IngresarCredencialesComponent } from './modules/login/ingresar-credenciales/ingresar-credenciales.component';
import { RegistrarDispositivoComponent } from './modules/login/registrar-dispositivo/registrar-dispositivo.component';
import { BienvenidoComponent } from './modules/login/bienvenido/bienvenido.component';
import { VerificarDispositivoComponent } from './modules/login/verificar-dispositivo/verificar-dispositivo.component';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';

import { ConsentComponent } from './modules/consent/consent.component';
import { VerificarChallengeComponent } from './modules/consent/verificar-challenge/verificar-challenge.component';



const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent,
    children: [
      { path: 'verificar/:challenge', component: VerificarDispositivoComponent },
      { path: 'login', component: IngresarCredencialesComponent },
      { path: 'login/:challenge', component: IngresarCredencialesComponent },
      { path: 'registrar', component: RegistrarDispositivoComponent },
      { path: 'bienvenido', component: BienvenidoComponent }
    ]
  },
  {
    path: 'consent',
    component: ConsentComponent,
    children: [
      { path: 'verificar/:challenge', component: VerificarChallengeComponent }
    ]
  },
  //{ path: '**', redirectTo: '/login/verificar/d' }
  { path: '**', redirectTo: '/auth/oauth2' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
