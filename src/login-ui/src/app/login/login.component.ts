import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'; 

import { map } from 'rxjs/operators';

import { LoginService } from '../login.service';

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.login_challenge = params['login_challenge'];
      this.service.init_login_flow(this.login_challenge).subscribe(
          r => {
            if (r.redirect_to != null) {
              this.redireccionar(r.redirect_to);
            }
          },
          e => {
            this.router.navigate(['error'],{queryParams:{'error':'error login','error_description':e}});
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
        this.router.navigate(['error'],{queryParams:{'error':'error login','error_description':e}});
      }
    ));

  }

  redireccionar(url:string) {
    console.log('redireccionando a ' + url);
    this.document.location.href = url;
  }

}
