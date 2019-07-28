import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './modules/login/login.component';
import { IngresarCredencialesComponent } from './modules/login/ingresar-credenciales/ingresar-credenciales.component';
import { RegistrarDispositivoComponent } from './modules/login/registrar-dispositivo/registrar-dispositivo.component';
import { BienvenidoComponent } from './modules/login/bienvenido/bienvenido.component';
import { VerificarDispositivoComponent } from './modules/login/verificar-dispositivo/verificar-dispositivo.component';
import { AuthModule, OAuth2Config } from './modules/auth/auth.module';

import { ConsentComponent } from './modules/consent/consent.component';
import { VerificarChallengeComponent } from './modules/consent/verificar-challenge/verificar-challenge.component';

const oauthconf: OAuth2Config = environment.auth;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IngresarCredencialesComponent,
    RegistrarDispositivoComponent,
    BienvenidoComponent,
    VerificarDispositivoComponent,
    ConsentComponent, 
    VerificarChallengeComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot(oauthconf),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
