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

  }

}
