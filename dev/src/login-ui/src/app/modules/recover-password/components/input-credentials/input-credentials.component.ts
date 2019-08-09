import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-credentials',
  templateUrl: './input-credentials.component.html',
  styleUrls: ['./input-credentials.component.scss']
})
export class InputCredentialsComponent implements OnInit {

  ver_clave = false;
  accediendo = false;
  credenciales: FormGroup;

  constructor(private fb: FormBuilder) { 

    this.credenciales = fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("[a-zA-Z0-9]+")]],
      password2: ['', [Validators.required, Validators.minLength(8), Validators.pattern("[a-zA-Z0-9]+")]]
    })    

  }

  ngOnInit() {
  }

  configurar() {
    if (!this.credenciales.valid) {
      return;
    }
  }

}
