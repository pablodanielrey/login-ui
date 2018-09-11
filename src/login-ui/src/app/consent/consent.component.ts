import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute,
              private service: LoginService) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.consent_challenge = p['consent_challenge'];
      this.service.consent_challenge(this.consent_challenge).subscribe(
        r => {
          console.log(r);
          this.consent = r;
          // si skip == True no debo mostrar la pantalla de aceptación de nuevos permisos
          if (r['skip']) {
            this.aceptar();
          }
        },
        e => {
          console.log(e);
        });      
      
    });
  }

  aceptar() {
    this.service.aceptar_consent_challenge(this.consent_challenge).subscribe(
      r => {
        console.log('redireccionando a ' + r);
        this.document.location.href = r;
      },
      e => {
        console.log(e);
      }
    );
  }

}
