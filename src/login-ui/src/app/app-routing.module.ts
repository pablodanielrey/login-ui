import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ConsentComponent } from './consent/consent.component';

import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

import { Oauth2Component } from './oauth2/oauth2.component';

import { SesionesComponent } from './sistema/sesiones/sesiones.component';
import { IngresardniComponent } from './recuperar-clave/ingresardni/ingresardni.component';
import { ConfirmarcodigoComponent } from './recuperar-clave/confirmarcodigo/confirmarcodigo.component';
import { FinalizarComponent } from './recuperar-clave/finalizar/finalizar.component';

const routes: Routes = [
  { path: 'logout/:id_token/:client_id', component: LogoutComponent },
  { path: 'login/:login_challenge', component: LoginComponent },
  { path: 'consent/:consent_challenge', component: ConsentComponent },

  { 
    path: 'recuperar_clave', 
    component: RecuperarClaveComponent,
    children: [
      { path: 'ingresar_dni', component: IngresardniComponent },
      { path: 'confirmar_codigo', component: ConfirmarcodigoComponent },
      { path: 'finalizar', component: FinalizarComponent }
    ]},

  { path: 'error', component: ErrorComponent },

  { path: 'oauth2', component: Oauth2Component },

  { 
    path: 'sistema',
    children: [
      { path: 'sesiones', component: SesionesComponent }
    ]
  },

  { path: '**', component: AppComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
