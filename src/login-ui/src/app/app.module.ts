import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
//import { TokenInterceptor } from './auth.service';
import { OidpGuard } from './oauth2/oidp.guard';

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

@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent, RecuperarClaveComponent, ErrorComponent, ConsentComponent, SistemaComponent, SesionesComponent, LogoutComponent, Oauth2Component
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
  providers: [
    OidpGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
