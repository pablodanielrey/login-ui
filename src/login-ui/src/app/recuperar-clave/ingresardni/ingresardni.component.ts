import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../../login.service';

@Component({
  selector: 'app-ingresardni',
  templateUrl: './ingresardni.component.html',
  styleUrls: ['./ingresardni.component.css']
})
export class IngresardniComponent implements OnInit {

  form: FormGroup;
  chequeos: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private service: LoginService) {
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
    this.service.obtener_usuario_por_dni(this.form.value['dni']).subscribe(
      u => {
        this.router.navigate(['/recuperar_clave/confirmar_codigo']);
      },
      e => {
        this.form.reset();
        this.chequeos = true;
      }
    );
  }

}
