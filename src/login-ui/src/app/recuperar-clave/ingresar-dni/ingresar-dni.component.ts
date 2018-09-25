import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RecuperarClaveService } from '../../recuperar-clave.service';

@Component({
  selector: 'app-ingresar-dni',
  templateUrl: './ingresar-dni.component.html',
  styleUrls: ['./ingresar-dni.component.css']
})
export class IngresarDniComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private service: RecuperarClaveService) {
    this.form = fb.group({
      dni: ['', [Validators.pattern('[a-zA-Z0-9]+'), Validators.required]] 
    });
    this.form.valueChanges.subscribe(f => {
      console.log(f);
      console.log(this.form.valid);
    })
  }

  ngOnInit() {
  }

  chequear_dni() {
    if (!this.form.valid) {
      return;
    }
    let dni = this.form.value['dni'];
    this.service.verificar_dni(dni).subscribe(
      r => {
        if (r.ok) {
          if (r.tiene_correo) {
            this.router.navigate(['/recuperar_clave/confirmar_correo',r.usuario.id]);
          } else {
            this.router.navigate(['/recuperar_clave/sin_correo']);
          }
        } else {
          this.router.navigate(['/recuperar_clave/error_dni']);
        }
      },
      e => {
        this.router.navigate(['/recuperar_clave/error_servidor']);
      }
    );
  }

}
