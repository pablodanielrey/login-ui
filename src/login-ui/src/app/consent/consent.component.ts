import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.css']
})
export class ConsentComponent implements OnInit {

  consent_challenge: string = '';
  consent: string = '';

  constructor(@Inject(DOCUMENT) private document: any,
              private router: Router,
              private route: ActivatedRoute,
              private service: LoginService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.consent_challenge = p['consent_challenge'];
      this.service.init_consent_flow(this.consent_challenge).subscribe(
        r => {
          this.redireccionar(r.redirect_to);
        },
        e => {
          this.router.navigate(['error'], {'queryParams':{'error':'consent_error','error_description':e}});
        });      
      
    });
  }

  redireccionar(url:string) {
    console.log('redireccionando a ' + url);
    this.document.location.href = url;
  }

}
