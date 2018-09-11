import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-ui';

  constructor(private router: Router, private service:LoginService) {}

  ngOnInit() {
    /*
    this.service.chequear_sesion().subscribe(
      s => {
        console.log(s);
      },
      e => {
        console.log('error obteniendo la sesión');
        this.router.navigate(['login']);
      }
    );
    */
    this.service.login_challenge('sfsdfs').subscribe(
      l => {
        console.log(l);
      },
      e => {
        console.log(e);
      });
  }
}
