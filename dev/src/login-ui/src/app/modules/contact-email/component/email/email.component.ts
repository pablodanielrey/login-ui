import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  accediendo = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) { 

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email ]],
      email2: ['', [Validators.required, Validators.email ]]
    })    

  }

  ngOnInit() {
  }

  verificar() {
    if (!this.form.valid) {
      return;
    }
    this.router.navigate(['/recover/code']);
  }

}
















