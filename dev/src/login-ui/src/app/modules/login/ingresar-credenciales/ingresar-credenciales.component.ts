import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { of, Observable, combineLatest } from 'rxjs';
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

  error: string = '';
  mostrar: boolean = true;
  credenciales: FormGroup;

  challenge$: Observable<string>;
  device_id$: Observable<string>;
  credenciales$: Observable<any>;
  login$: Observable<any>;

  constructor(private fb: FormBuilder, 
              private router:Router, 
              private route:ActivatedRoute,
              private service:LoginService,
              @Inject(DOCUMENT) private document: any) {

    this.credenciales = fb.group({
      usuario: [''],
      clave: ['']
    })

    this.challenge$ = this.route.paramMap.pipe(map(params => params.get('challenge')));
    this.credenciales$ = of({u: this.credenciales.value['usuario'], c: this.credenciales.value['clave']});
    this.device_id$ = this.service.get_device_id();
    this.login$ = combineLatest(this.device_id$, this.challenge$, this.credenciales$).pipe(
      switchMap(rs => {
        let did = rs[0];
        let challenge = rs[1];
        let creds = rs[2];
        return this.service.login(creds.u, creds.c, did, challenge);
      })
    )
  }

  ngOnInit() {
  }

  acceder() {
    this.login$.subscribe(r => {
      console.log(r);
      let redirect_url = r['redirect_to'];
      this.document.location.href = redirect_url;
    }, e => {
      let err = e.error;
      if (err.response['redirect_to'] != undefined) {
        let redirect_url = err.response['redirect_to'];
        this.document.location.href = redirect_url;
      }
    });
  }

}
