import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { RecoverPasswordRoutingModule } from './modules/recover-password/recover-password-routing.module';

import { LoginComponent } from './modules/login/login.component';
import { IngresarCredencialesComponent } from './modules/login/ingresar-credenciales/ingresar-credenciales.component';
import { RegistrarDispositivoComponent } from './modules/login/registrar-dispositivo/registrar-dispositivo.component';
import { VerificarDispositivoComponent } from './modules/login/verificar-dispositivo/verificar-dispositivo.component';

import { ConsentComponent } from './modules/consent/consent.component';
import { VerificarChallengeComponent } from './modules/consent/verificar-challenge/verificar-challenge.component';
import { StartComponent } from './modules/system/start/start.component';
import { AuthGuardService } from './modules/auth/auth-guard.service';
import { ErrorComponent } from './modules/login/error/error.component';
import { GenerarQrComponent } from './modules/login/generar-qr/generar-qr.component';
import { ActivarQrUserComponent } from './modules/login/activar-qr-user/activar-qr-user.component';
import { SeleccionarUsuarioQrComponent } from './modules/login/seleccionar-usuario-qr/seleccionar-usuario-qr.component';
import { ActivarQrComponent } from './modules/login/activar-qr/activar-qr.component';




const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent,
    children: [
      { path: 'verificar/:challenge', component: VerificarDispositivoComponent },
      { path: 'login', component: IngresarCredencialesComponent },
      { path: 'login/:challenge', component: IngresarCredencialesComponent },
      { path: 'registrar', component: RegistrarDispositivoComponent },
      { path: 'qrcode/:challenge', component: GenerarQrComponent },
      { path: 'qrcode/activar/:code', component: ActivarQrComponent },
      { path: 'qrcode/activar/:user/:code', component: ActivarQrUserComponent },
      { path: 'qrcode/seleccionar-usuario/:code', component: SeleccionarUsuarioQrComponent },
      { path: 'error', component: ErrorComponent }
    ]
  },
  {
    path: 'consent',
    component: ConsentComponent,
    children: [
      { path: 'verificar/:challenge', component: VerificarChallengeComponent }
    ]
  },
  {
    path: 'system',
    children: [
      { path: 'start', component: StartComponent },
      { path: '**', redirectTo: 'start' }
    ]
  },
  //{ path: '**', redirectTo: '/login/verificar/d' }
  //{ path: '**', redirectTo: '/auth/oauth2' }
  { path: '**', redirectTo: '/system/start' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    RecoverPasswordRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
