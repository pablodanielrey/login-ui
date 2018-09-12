import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { LoginService } from './login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-ui';

  constructor(@Inject(DOCUMENT) private document: any, 
              private router: Router, 
              private route: ActivatedRoute,
              private service: LoginService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      this.procesarParametros(p);
    });
    this.route.paramMap.subscribe(p => {
      this.procesarParametros(p);
    });
  }

  procesarParametros(p:ParamMap) {
    if (p.has('login_challenge')) {
      let challenge = p.get('login_challenge');
      this.router.navigate(['login',challenge]);
    }

    if (p.has('consent_challenge')) {
      let challenge = p.get('consent_challenge');
      this.router.navigate(['consent',challenge]);
    }
  }
}
