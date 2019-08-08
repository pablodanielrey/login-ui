import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { of, Observable, combineLatest, BehaviorSubject } from 'rxjs';
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
    this.device_id$ = this.service.get_device_id();
  }

  ngOnInit() {
  }

  acceder() {
    this.subs.push(
      combineLatest(
        this.device_id$,
        this.challenge$,
        of({u: this.credenciales.value['usuario'], c: this.credenciales.value['clave']})
      ).pipe(
        switchMap(rs => {
          let did = rs[0];
          let challenge = rs[1];
          let creds = rs[2];
          return this.service.login(creds.u, creds.c, did, challenge);
        })
      ).subscribe(r => {
        console.log(r);
        let redirect_url = r['redirect_to'];
        this.document.location.href = redirect_url;
      }, e => {
        let err = e.error;
        if (err.response['redirect_to'] != undefined) {
          let redirect_url = err.response['redirect_to'];
          this.document.location.href = redirect_url;
        } else {
          this.router.navigate(['/login/error']);
        }
      })
    );
  }

  login_hash() {
    this.subs.push(
      this.challenge$.subscribe(c => {
        this.router.navigate([`/login/qrcode/${c}`]);
      })
    )
  }

}
