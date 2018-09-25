import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'; 

import { map } from 'rxjs/operators';

import { LoginService } from '../../login.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  login_challenge: string = '';
  estado : number = 200;
  formulario: FormGroup;
  usuario = new FormControl('', Validators.required);
  clave = new FormControl('', Validators.required);
  loginHeader : string = environment.loginHeader;
  loginLogo : string = environment.loginLogo;
  loginFooterMini : string = environment.loginFooterMini;
  loginFooterFull : string = environment.loginFooterFull;

  subscriptions = [];

  constructor(@Inject(DOCUMENT) private document: any,
              private fb: FormBuilder, 
              private router: Router,
              private route: ActivatedRoute, 
              private service: LoginService) { 

    this.formulario = fb.group({
      'usuario': this.usuario,
      'clave': this.clave
    });
  }

  procesar_error(e:any) {
    this.router.navigate(['error'],
    {
      queryParams:{
        'error':e.name,
        'error_description':e.message
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let login_challenge = params['login_challenge'];
      this.service.init_login_flow(login_challenge).subscribe(
          r => {
            if (r.redirect_to != null) {
              this.redireccionar(r.redirect_to);
            } else {
              /*
                lo seteo para poder usarlo cuando se realice el login
              */
              this.login_challenge = login_challenge;
            }
          },
          e => {
            console.log(e);
            this.procesar_error(e);
          });
     });
  }

  cambiar_tipo(input: any): any {
    input.type = input.type === 'password' ?  'text' : 'password';
  }

  acceder() {
    console.log(this.formulario);
    if (!this.formulario.valid) {
      return;
    }

    this.subscriptions.push(this.service.login(this.usuario.value, this.clave.value, this.login_challenge).subscribe(
      r => {
        this.redireccionar(r.redirect_to);
      },
      e => {
        this.procesar_error(e);
      }
    ));

  }

  redireccionar(url:string) {
    console.log('redireccionando a ' + url);
    this.document.location.href = url;
  }

}
