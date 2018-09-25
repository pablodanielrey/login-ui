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
      email: ['',[Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      let uid = p.get('uid');
      this.service.obtener_correo(uid).subscribe(d => {
        if (d.ok) {
          this.data = d;
        } else {
          this.router.navigate(['/recuperar_clave']);
        }
      });
    });
    
  }

  esVaron() {
    return (this.data.usuario.sexo && this.data.usuario.sexo.toLowerCase().startsWith('m'));
  }

  enviar_correo() {
    if (!this.form.valid) {
      return;
    }
    let eid = this.data.correo.id;
    let correo = this.form.value['email'];
    this.service.enviar_codigo(eid, correo).subscribe(
      d => {
        if (d.ok) {
          this.router.navigate(['/recuperar_clave/confirmar_codigo',d.iid]);
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
