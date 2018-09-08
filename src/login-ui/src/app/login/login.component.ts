import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'; 

import { map } from 'rxjs/operators';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  consent_id: string = null;

  formulario: FormGroup;

  hide: boolean = true;
  usuario = new FormControl('', Validators.required);
  clave = new FormControl('', Validators.required);

  subscriptions = [];

  constructor(private fb: FormBuilder, 
              private route: ActivatedRoute, 
              private service: LoginService) { 

    this.formulario = fb.group({
      'usuario': this.usuario,
      'clave': this.clave
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.consent_id = params['consent'];
      console.log(this.consent_id);
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

    this.subscriptions.push(this.service.login(this.usuario.value, this.clave.value).subscribe(
      r => {
        console.log(r);
        this.formulario.reset();
      },
      e => {
        console.log(e);
      }));
    console.log(this.usuario);
    console.log(this.clave);
  }

}
