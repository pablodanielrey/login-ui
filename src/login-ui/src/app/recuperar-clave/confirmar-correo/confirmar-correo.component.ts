import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirmar-correo',
  templateUrl: './confirmar-correo.component.html',
  styleUrls: ['./confirmar-correo.component.css']
})
export class ConfirmarCorreoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.form = fb.group({
      email: ['',[Validators.pattern('[a-zA-Z0-9._-]+'), Validators.required]]
    });
  }

  ngOnInit() {
  }

  confirmar() {
    
  }

}
