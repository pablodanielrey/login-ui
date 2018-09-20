import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
//import { TokenInterceptor } from './auth.service';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { LoginComponent } from './login/login.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { ErrorComponent } from './error/error.component';
import { ConsentComponent } from './consent/consent.component';
import { SistemaComponent } from './sistema/sistema.component';
import { SesionesComponent } from './sistema/sesiones/sesiones.component';
import { LogoutComponent } from './logout/logout.component';
import { Oauth2Component } from './oauth2/oauth2.component';
import { IngresardniComponent } from './recuperar-clave/ingresardni/ingresardni.component';
import { ConfirmarcodigoComponent } from './recuperar-clave/confirmarcodigo/confirmarcodigo.component';
import { FinalizarComponent } from './recuperar-clave/finalizar/finalizar.component';

@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent, RecuperarClaveComponent, ErrorComponent, ConsentComponent, SistemaComponent, SesionesComponent, LogoutComponent, Oauth2Component, IngresardniComponent, ConfirmarcodigoComponent, FinalizarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
