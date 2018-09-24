import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { RecuperarClaveService } from '../../recuperar-clave.service';
import { RecuperarCorreoData } from '../../entities/recuperar';

@Component({
  selector: 'app-confirmar-correo',
  templateUrl: './confirmar-correo.component.html',
  styleUrls: ['./confirmar-correo.component.css']
})
export class ConfirmarCorreoComponent implements OnInit {

  form: FormGroup;
  data: RecuperarCorreoData;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private service: RecuperarClaveService) { 
    this.form = fb.group({
      email: ['',[Validators.pattern('[a-zA-Z0-9._-]+'), Validators.required]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      let dni = p['dni'];
      this.service.obtener_correo(dni).subscribe(d => {
        this.data = d;
      });
    });
    
  }

  tip():string {
    return 'alg***';
  }

  dominio():string {
    return "econo.unlp.edu.ar";
  }

  confirmar() {
    
  }

}
