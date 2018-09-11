import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute, 
              private service: LoginService) { 

    this.formulario = fb.group({
      'usuario': this.usuario,
      'clave': this.clave
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.login_challenge = params['login_challenge'];
      console.log(this.login_challenge);
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
        console.log(r);
        this.estado = 200;
        this.formulario.reset();
        
        console.log('redireccionando a ' + r);
        this.document.location.href = r;
      },
      e => {
        console.log(e);
        this.estado = e.status;
      }
    ));

  }

}
