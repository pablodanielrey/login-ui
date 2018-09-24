import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirmar-codigo',
  templateUrl: './confirmar-codigo.component.html',
  styleUrls: ['./confirmar-codigo.component.css']
})
export class ConfirmarCodigoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.form = fb.group({
      codigo: ['', [Validators.pattern('[a-zA-Z0-9]+'), Validators.required]]
    });
  }

  ngOnInit() {
    
  }

  confirmar() {
    if (!this.form.valid) {
      return;
    }
    this.router.navigate(['/recuperar_clave/finalizar']);
  }

}
