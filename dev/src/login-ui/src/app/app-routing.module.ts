import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresarCredencialesComponent } from './modules/login/ingresar-credenciales/ingresar-credenciales.component';
import { RegistrarDispositivoComponent } from './modules/login/registrar-dispositivo/registrar-dispositivo.component';
import { BienvenidoComponent } from './modules/login/bienvenido/bienvenido.component';
import { VerificarDispositivoComponent } from './modules/login/verificar-dispositivo/verificar-dispositivo.component';


const routes: Routes = [
  { 
    path: 'login', 
    children: [
      { path: 'verificar/:challenge', component: VerificarDispositivoComponent },
      { path: 'login', component: IngresarCredencialesComponent },
      { path: 'login/:challenge', component: IngresarCredencialesComponent },
      { path: 'registrar', component: RegistrarDispositivoComponent },
      { path: 'bienvenido', component: BienvenidoComponent },
      { path: '', redirectTo: 'verificar/d', pathMatch: 'full'}
    ]
  },
  { path: '**', redirectTo: '/login/verificar/d' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
