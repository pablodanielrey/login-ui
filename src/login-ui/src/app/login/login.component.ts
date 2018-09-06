import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  consent_id: string = null;
  hide: boolean = true;
  usuario: string = "";
  clave: string = "";

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.consent_id = params['consent'];
      console.log(this.consent_id);
    });
  }

  acceder() {
    console.log(this.usuario);
    console.log(this.clave);
  }

}
