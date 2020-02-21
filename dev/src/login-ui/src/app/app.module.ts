import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginMaterialModule } from './login-material.module';

import { LoginComponent } from './modules/login/login.component';
import { IngresarCredencialesComponent } from './modules/login/ingresar-credenciales/ingresar-credenciales.component';
import { RegistrarDispositivoComponent } from './modules/login/registrar-dispositivo/registrar-dispositivo.component';
import { VerificarDispositivoComponent } from './modules/login/verificar-dispositivo/verificar-dispositivo.component';
import { AuthModule, OAuth2Config } from './modules/auth/auth.module';

import { ConsentComponent } from './modules/consent/consent.component';
import { VerificarChallengeComponent } from './modules/consent/verificar-challenge/verificar-challenge.component';
import { StartComponent } from './modules/system/start/start.component';
import { ErrorComponent } from './modules/login/error/error.component';
import { GenerarQrComponent } from './modules/login/generar-qr/generar-qr.component';
import { ActivarQrUserComponent } from './modules/login/activar-qr-user/activar-qr-user.component';
import { SeleccionarUsuarioQrComponent } from './modules/login/seleccionar-usuario-qr/seleccionar-usuario-qr.component';
import { ActivarQrComponent } from './modules/login/activar-qr/activar-qr.component';
import { RecoverPasswordModule } from './modules/recover-password/recover-password.module';
import { ContactEmailModule } from './modules/contact-email/contact-email.module';
import { TemporalCredentialsModule } from './modules/temporal-credentials/temporal-credentials.module';
import { UpdatingModule } from './modules/updating/updating.module';


const oauthconf: OAuth2Config = environment.auth;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IngresarCredencialesComponent,
    RegistrarDispositivoComponent,
    VerificarDispositivoComponent,
    ConsentComponent, 
    VerificarChallengeComponent, 
    StartComponent, 
    ErrorComponent, 
    GenerarQrComponent, 
    ActivarQrUserComponent, 
    SeleccionarUsuarioQrComponent, 
    ActivarQrComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot(oauthconf),
    AppRoutingModule,
    RecoverPasswordModule.forRoot(),
    ContactEmailModule.forRoot(),
    TemporalCredentialsModule.forRoot(),
    UpdatingModule.forRoot(),
    LoginMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
