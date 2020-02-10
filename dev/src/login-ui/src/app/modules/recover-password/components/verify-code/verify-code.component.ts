import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {

  accediendo = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) { 

    this.form = fb.group({
      code: ['', [Validators.required, Validators.minLength(8), Validators.pattern("[a-zA-Z0-9]+")]]
    })    

  }

  ngOnInit() {
  }

  verificar() {
    if (!this.form.valid) {
      return;
    }
    this.accediendo = true;
    this.router.navigate(['/recover/credentials']);
  }


}
