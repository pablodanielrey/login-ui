import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecuperarClaveService } from '../../recuperar-clave.service';

@Component({
  selector: 'app-confirmar-codigo',
  templateUrl: './confirmar-codigo.component.html',
  styleUrls: ['./confirmar-codigo.component.css']
})
export class ConfirmarCodigoComponent implements OnInit {

  form: FormGroup;
  rid: string = 'nulo';

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: RecuperarClaveService) { 
    this.form = fb.group({
      codigo: ['', [Validators.pattern('[a-zA-Z0-9]+'), Validators.required]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
        p => {
          this.rid = p.get('rid');
          console.log(this);
        }
      );
  }

  confirmar() {
    console.log(this);
    if (!this.form.valid) {
      return;
    }
    let codigo = this.form.value['codigo'];
    let rid = this.rid;
    this.service.verificar_codigo(rid, codigo).subscribe(
      r => {
        if (r.ok) {
          this.router.navigate(['/recuperar_clave/finalizar',r.clave]);
        } else {
          this.form.setErrors({codigo:'codigo inválido'});
        }
      }, 
      e => {
        this.form.setErrors({codigo:'codigo inválido'});
      }
    )
  }

}
