import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { OidpGuard } from './oauth2/oidp.guard';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { ErrorComponent } from './error/error.component';

import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';
import { ConsentComponent } from './login/consent/consent.component';

import { SistemaComponent } from './sistema/sistema.component';
import { SesionesComponent } from './sistema/sesiones/sesiones.component';

import { Oauth2Component } from './oauth2/oauth2.component';

import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { IngresarDniComponent } from './recuperar-clave/ingresar-dni/ingresar-dni.component';
import { ConfirmarCodigoComponent } from './recuperar-clave/confirmar-codigo/confirmar-codigo.component';
import { FinalizarComponent } from './recuperar-clave/finalizar/finalizar.component';
import { SinCorreoComponent } from './recuperar-clave/sin-correo/sin-correo.component';
import { ConfirmarCorreoComponent } from './recuperar-clave/confirmar-correo/confirmar-correo.component';
import { ErrorDniComponent } from './recuperar-clave/error-dni/error-dni.component';
import { ErrorServidorComponent } from './recuperar-clave/error-servidor/error-servidor.component';
import { IngresarClaveComponent } from './recuperar-clave/ingresar-clave/ingresar-clave.component';
import { ClaveModificadaComponent } from './recuperar-clave/clave-modificada/clave-modificada.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent, 
    ErrorComponent, ConsentComponent, SistemaComponent, SesionesComponent, LogoutComponent, Oauth2Component, 
    RecuperarClaveComponent, IngresarDniComponent, ConfirmarCorreoComponent, ConfirmarCodigoComponent, FinalizarComponent, IngresarClaveComponent, ClaveModificadaComponent, SinCorreoComponent, ErrorDniComponent, ErrorServidorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
//    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http'],
        sendAccessToken: true
    }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    OidpGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
