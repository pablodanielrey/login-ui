import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-input-credentials',
  templateUrl: './input-credentials.component.html',
  styleUrls: ['./input-credentials.component.scss']
})
export class InputCredentialsComponent implements OnInit {

  ver_clave = false;
  accediendo = false;
  credenciales: FormGroup;
  

  constructor(private fb: FormBuilder, private router:Router, private route:ActivatedRoute) { 
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
    this.router.navigate(['/recover/finalize']);
  }

}
