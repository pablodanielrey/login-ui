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

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ConsentComponent } from './consent/consent.component';

import { SistemaComponent } from './sistema/sistema.component';
import { SesionesComponent } from './sistema/sesiones/sesiones.component';

import { Oauth2Component } from './oauth2/oauth2.component';

import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { IngresardniComponent } from './recuperar-clave/ingresardni/ingresardni.component';
import { ConfirmarCodigoComponent } from './recuperar-clave/confirmar-codigo/confirmar-codigo.component';
import { FinalizarComponent } from './recuperar-clave/finalizar/finalizar.component';
import { SinCorreoComponent } from './recuperar-clave/sin-correo/sin-correo.component';
import { ConfirmarCorreoComponent } from './recuperar-clave/confirmar-correo/confirmar-correo.component';

@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent, RecuperarClaveComponent, ErrorComponent, ConsentComponent, SistemaComponent, SesionesComponent, LogoutComponent, Oauth2Component, IngresardniComponent, ConfirmarcodigoComponent, FinalizarComponent, SinCorreoComponent, ConfirmarCorreoComponent
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
    })
  ],
  providers: [
    OidpGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
