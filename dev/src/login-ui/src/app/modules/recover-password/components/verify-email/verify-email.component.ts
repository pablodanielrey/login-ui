import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  
  accediendo = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) { 
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]]
    })    
  }

  ngOnInit() {
  }

  verificar() {
    if (!this.form.valid) {
      return;
    }
    this.accediendo = true;
    this.router.navigate(['/recover/code']);
  }

}
