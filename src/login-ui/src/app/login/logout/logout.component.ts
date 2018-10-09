import { Component, OnInit, Inject } from '@angular/core';
import { Location, DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { LoginService } from '../../login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: any,
              private route: ActivatedRoute, 
              private location: Location, 
              private service: LoginService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      let id_token = p.get('id_token');
      let client_id = p.get('client_id');

      this.service.logout(id_token, client_id).subscribe(
        r => {
          console.log('redireccionando a ' + r.redirect_to);
          this.document.location.href = r.redirect_to;
        },
        e => {
          console.log(e);
        }
      );
    });
  }

}
