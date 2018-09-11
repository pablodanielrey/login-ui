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
        this.router.navigate(['login',challenge]);
      }

      if (p.has('consent_challenge')) {
        let challenge = p.get('consent_challenge');
        this.router.navigate(['consent',challenge]);
      }

      this.router.navigate(['error']);
    },
    e => {
      this.router.navigate(['error']);
    });
  }
}
