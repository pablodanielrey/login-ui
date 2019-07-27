import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IngresarCredencialesComponent } from './modules/login/ingresar-credenciales/ingresar-credenciales.component';
import { RegistrarDispositivoComponent } from './modules/login/registrar-dispositivo/registrar-dispositivo.component';
import { BienvenidoComponent } from './modules/login/bienvenido/bienvenido.component';
import { VerificarDispositivoComponent } from './modules/login/verificar-dispositivo/verificar-dispositivo.component';
import { AuthModule, OAuth2Config } from './modules/auth/auth.module';


const conf: OAuth2Config = environment.auth;


@NgModule({
  declarations: [
    AppComponent,
    IngresarCredencialesComponent,
    RegistrarDispositivoComponent,
    BienvenidoComponent,
    VerificarDispositivoComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot(conf),
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
