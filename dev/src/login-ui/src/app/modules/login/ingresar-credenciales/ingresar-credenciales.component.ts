import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

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
              private service:LoginService) {
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
      switchMap(d => this.service.get_login_challenge(null).pipe(
        switchMap(c => this.service.login(d.u, d.c, c))
      )
    )).subscribe(r => {
      this.router.navigate(['/login/registrar']);
    });
  }

}
