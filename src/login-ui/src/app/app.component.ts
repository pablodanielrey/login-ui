import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { LoginService } from './login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-ui';

  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private service: LoginService) { }

  ngOnInit() {
    this.router.routerState.root.queryParamMap.subscribe(p => {
      if (p.has('login_challenge')) {
        let challenge = p.get('login_challenge');
        this.service.login_challenge(challenge).subscribe(
          r => {
            console.log(r);
            // si skip == True no debo mostrar login
            if (!r['skip']) {
              this.router.navigate(['login',challenge]);
            } else {
              this.service.aceptar_login_challenge(challenge).subscribe(
                r => {
                  console.log('redireccionando a ' + r);
                  this.document.location.href = r;
                },
                e => {
                  console.log(e);
                }
              );
            }
          },
          e => {
            console.log(e);
          });
      }

      if (p.has('consent_challenge')) {
        let challenge = p.get('consent_challenge');
        this.service.consent_challenge(challenge).subscribe(
          r => {
            console.log(r);
            // si skip == True no debo mostrar la pantalla de aceptación de nuevos permisos
            if (!r['skip']) {
              this.router.navigate(['consent',r]);
            } else {
              this.service.aceptar_consent_challenge(challenge).subscribe(
                r => {
                  console.log('redireccionando a ' + r);
                  this.document.location.href = r;
                },
                e => {
                  console.log(e);
                }
              );
            }
          },
          e => {
            console.log(e);
          });
      }

      this.router.navigate['error'];
    });
  }
}
