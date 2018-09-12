import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'; 

import { LoginService } from '../../login.service';

@Component({
  selector: 'app-sesiones',
  templateUrl: './sesiones.component.html',
  styleUrls: ['./sesiones.component.css']
})
export class SesionesComponent implements OnInit {

  formulario: FormGroup = null;
  uid = new FormControl('');
  sesiones: string[] = [];

  constructor(private fb: FormBuilder,
              private service: LoginService) { 

      this.formulario = fb.group({
        'uid': this.uid
      });
  }

  ngOnInit() {
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
