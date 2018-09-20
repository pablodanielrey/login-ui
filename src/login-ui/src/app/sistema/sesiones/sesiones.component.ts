import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'; 
import { OAuthService } from 'angular-oauth2-oidc';

import { LoginService } from '../../login.service';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {

  usuario_id: string = null;
  formulario: FormGroup = null;
  uid = new FormControl('');
  sesiones: string[] = [];

  constructor(private fb: FormBuilder,
              private service: LoginService,
              private oauthService: OAuthService) { 

      this.formulario = fb.group({
        'uid': this.uid
      });
  }

  ngOnInit() {
    console.log(this.oauthService.getAccessToken());
    let c = this.oauthService.getIdentityClaims();
    this.usuario_id = c['sub'];
    this.uid.setValue(this.usuario_id);
  }

  obtener_sesiones() {
    this.service.user_sessions(this.uid.value).subscribe(r => {
      this.sesiones = r;
      console.log(r);
    });
  }

  eliminar_cliente(uid, cid) {
    this.service.delete_user_client_sessions(uid, cid).subscribe(r => {
      console.log(r);
    });
  }

  eliminar_sesiones() {
    this.service.delete_user_sessions(this.uid.value).subscribe(r => {
      console.log(r);
    });
  }

}
