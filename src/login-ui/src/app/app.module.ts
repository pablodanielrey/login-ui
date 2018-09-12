import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { LoginComponent } from './login/login.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { ErrorComponent } from './error/error.component';
import { ConsentComponent } from './consent/consent.component';
import { SistemaComponent } from './sistema/sistema.component';
import { SesionesComponent } from './sistema/sesiones/sesiones.component';

@NgModule({
  declarations: [
    AppComponent,    
    LoginComponent, RecuperarClaveComponent, ErrorComponent, ConsentComponent, SistemaComponent, SesionesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
