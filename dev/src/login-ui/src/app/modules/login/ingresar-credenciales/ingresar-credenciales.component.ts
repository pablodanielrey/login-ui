import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ingresar-credenciales',
  templateUrl: './ingresar-credenciales.component.html',
  styleUrls: ['./ingresar-credenciales.component.scss']
})
export class IngresarCredencialesComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  mostrar: boolean = true;
  credenciales: FormGroup;

  constructor(private fb: FormBuilder, 
              private router:Router, 
              private route:ActivatedRoute,
              private service:LoginService,
              @Inject(DOCUMENT) private document: any) {

    this.credenciales = fb.group({
      usuario: [''],
      clave: ['']
    })
  }

  ngOnInit() {
  }

  acceder() {
    of(
      {
        u: this.credenciales.value['usuario'],
        c: this.credenciales.value['clave']
      }
    ).pipe(
      switchMap(d => this.route.paramMap.pipe(
        switchMap(params => {
          let challenge = params.get('challenge');
          return this.service.login(d.u, d.c, challenge);
        })
      )
    )).subscribe(r => {
      console.log(r);
      let redirect_url = r['redirect_to'];
      this.document.location.href = redirect_url;
    });
  }

}
