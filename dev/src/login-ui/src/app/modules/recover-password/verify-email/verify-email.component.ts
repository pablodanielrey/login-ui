import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  
  accediendo = false;
  form: FormGroup;

  constructor(private fb: FormBuilder) { 

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
  }

}
