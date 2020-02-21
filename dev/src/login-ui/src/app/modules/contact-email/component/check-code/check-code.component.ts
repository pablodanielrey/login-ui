import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.scss']
})

export class CheckCodeComponent implements OnInit {

  accediendo = false;
  form: FormGroup;
  correo$ : Observable<String>;

  constructor(private fb: FormBuilder, private router:Router) { 

    this.form = fb.group({
      code: ['', [Validators.required, Validators.minLength(8), Validators.pattern("[a-zA-Z0-9]+")]]
    })    

  }

  ngOnInit() {
    this.correo$ = of('pablodanielrey@gmail.com');
  }

  verificar() {
    if (!this.form.valid) {
      return;
    }
    this.accediendo = true;
    this.router.navigate(['/email/finalize']);
  }


}




