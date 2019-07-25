import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';

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

  mostrar: boolean = false;
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
    this.subs.push(this.route.paramMap.subscribe(params => {
      let c = params.get('challenge');
      if (c != null) {
        localStorage.setItem('login_challenge', c);
        this.mostrar = true;
      } else {
        localStorage.removeItem('login_challenge');
        this.router.navigate(['/oauth2']);
      }
    }));
  }

  acceder() {
    let u = this.credenciales.value['usuario'];
    let c = this.credenciales.value['clave'];
    let h = localStorage.getItem('login_challenge');
    console.log(this.credenciales.value);
    this.subs.push(this.service.login(u,c,h).subscribe(r => {
      this.router.navigate(['/login/registrar']);
    }))
  }

}
