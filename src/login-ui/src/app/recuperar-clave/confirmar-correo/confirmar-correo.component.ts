import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private service: RecuperarClaveService) { 
    this.form = fb.group({
      email: ['',[Validators.pattern('[a-zA-Z0-9._-]+'), Validators.required]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      let uid = p['uid'];
      this.service.obtener_correo(uid).subscribe(d => {
        if (d.ok) {
          this.data = d;
        } else {
          this.form.setErrors({email:'correo no válido'});
        }
      });
    });
    
  }

  enviar_correo() {
    if (!this.form.valid) {
      return;
    }
    let eid = this.data.correo.id;
    let correo = this.form.value['email'];
    this.service.enviar_codigo(eid, correo).subscribe(
      d => {
        if (d) {
          this.router.navigate(['/recuperar_clave/confirmar_codigo']);
        } else {
          this.form.setErrors({email:'correo no válido'});  
        }
        
      },
      e => {
        this.form.setErrors({email:'correo no válido'});
      }
    );
  }

}
