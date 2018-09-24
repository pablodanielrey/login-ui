import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RecuperarClaveService } from '../../recuperar-clave.service';

@Component({
  selector: 'app-ingresardni',
  templateUrl: './ingresardni.component.html',
  styleUrls: ['./ingresardni.component.css']
})
export class IngresardniComponent implements OnInit {

  form: FormGroup;
  chequeos: boolean = false;

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
          this.router.navigate(['/recuperar_clave/confirmar_correo',r.usuario.id]);
        } else {
          this.form.setErrors({dni:r.error.descripcion});
        }
      },
      e => {
        this.form.setErrors({dni:'error'});
      }
    );
  }

}
