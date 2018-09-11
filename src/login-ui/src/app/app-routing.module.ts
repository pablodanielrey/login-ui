import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { ConsentComponent } from './consent/consent.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'consent/:consent', component: ConsentComponent },
  { path: 'recuperar_clave', component: RecuperarClaveComponent },
  { path: 'error', component: ErrorComponent }
  //{ path: '**', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
