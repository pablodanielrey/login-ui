import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'; 
import { Oauth2Service } from '../../oauth2/oauth2.service';

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
              private router: Router,
              private service: LoginService,
              private oauthService: Oauth2Service) { 

      this.formulario = fb.group({
        'uid': this.uid
      });
  }

  ngOnInit() {
    this.usuario_id = this.oauthService.getId();
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

  logout() {
    this.oauthService.logout().subscribe(
      r => {
        console.log(r);
        this.router.navigate(['/']);
      },
      e => {
        console.log(e);
      }
    )
  }

}
