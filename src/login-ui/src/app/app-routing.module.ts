import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { ConsentComponent } from './login/consent/consent.component';

import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

import { OidpGuard } from './oauth2/oidp.guard';
import { Oauth2Component } from './oauth2/oauth2.component';

import { SistemaComponent } from './sistema/sistema.component';
import { SesionesComponent } from './sistema/sesiones/sesiones.component';
import { IngresarDniComponent } from './recuperar-clave/ingresar-dni/ingresar-dni.component';
import { ConfirmarCodigoComponent } from './recuperar-clave/confirmar-codigo/confirmar-codigo.component';
import { FinalizarComponent } from './recuperar-clave/finalizar/finalizar.component';
import { SinCorreoComponent } from './recuperar-clave/sin-correo/sin-correo.component';
import { ConfirmarCorreoComponent } from './recuperar-clave/confirmar-correo/confirmar-correo.component';
import { ErrorServidorComponent } from './recuperar-clave/error-servidor/error-servidor.component';
import { ErrorDniComponent } from './recuperar-clave/error-dni/error-dni.component';
import { IngresarClaveComponent } from './recuperar-clave/ingresar-clave/ingresar-clave.component';
import { ClaveModificadaComponent } from './recuperar-clave/clave-modificada/clave-modificada.component';


const routes: Routes = [
  { path: 'logout/:id_token/:client_id', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:login_challenge', component: LoginComponent },
  { path: 'consent', component: ConsentComponent },
  { path: 'consent/:consent_challenge', component: ConsentComponent },

  { 
    path: 'recuperar_clave', 
    component: RecuperarClaveComponent,
    children: [
      { path: 'ingresar_dni', component: IngresarDniComponent },
      { path: 'confirmar_correo/:uid', component: ConfirmarCorreoComponent },
      { path: 'confirmar_codigo/:rid', component: ConfirmarCodigoComponent },
      { path: 'ingresar_clave/:cid', component: IngresarClaveComponent },
      { path: 'clave_modificada', component: ClaveModificadaComponent },
      { path: 'finalizar/:temporal', component: FinalizarComponent },
      { path: 'error_dni', component: ErrorDniComponent },
      { path: 'error_servidor', component: ErrorServidorComponent },
      { path: 'sin_correo', component: SinCorreoComponent }
    ]},

  { path: 'error/:error', component: ErrorComponent },
  { path: 'oauth2', component: Oauth2Component },

  { 
    path: 'sistema',
    component: SistemaComponent,
    canActivate: [OidpGuard],
    children: [
      { path: 'inicial', redirectTo: '/sistema/sesiones' },
      { path: 'sesiones', component: SesionesComponent }
    ]
  },
  { path: '**', redirectTo: '/recuperar_clave/ingresar_dni', pathMatch: 'full' }

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
