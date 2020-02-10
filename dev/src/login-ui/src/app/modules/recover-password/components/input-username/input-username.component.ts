import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-username',
  templateUrl: './input-username.component.html',
  styleUrls: ['./input-username.component.scss']
})
export class InputUsernameComponent implements OnInit {

  accediendo = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) { 

    this.form = fb.group({
      usuario: ['', [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Z0-9]+")]]
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
