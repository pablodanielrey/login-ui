import { Component, OnInit, Inject } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { CookieService } from 'ngx-cookie-service';


import { Oauth2Service } from '../../oauth2/oauth2.service';
import { LoginService } from '../../login.service';

const LOGOUT_REDIRECT = environment.default_logout_redirect;

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location, 
              private service: LoginService,
              private oauthService: Oauth2Service,
              private cookies: CookieService) {

  }

  ngOnInit() {
    this.cookies.deleteAll();

    this.route.paramMap.subscribe(p => {
      let id_token = p.get('id_token');
      let client_id = p.get('client_id');

      if (!this.oauthService.hasValidToken()) {
        console.log('no tiene token válido');
        this.document.location.href = LOGOUT_REDIRECT;

      } else {
        this.service.logout(id_token, client_id).subscribe(
          r => {
            console.log('redireccionando a ' + r.redirect_to);
            this.document.location.href = r.redirect_to;
          },
          e => {
            console.log(e);
            this.router.navigate(['/error'], e);
          }
        );
      }
    });
  }

}
