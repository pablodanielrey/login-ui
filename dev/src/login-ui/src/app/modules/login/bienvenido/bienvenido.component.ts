import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

interface User {
  username: string,
  lastname: string
}

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  user$: Observable<User>;

  constructor(private auth: AuthService,
              private route:ActivatedRoute, 
              @Inject(DOCUMENT) private document: any) { 
    this.user$ = this.auth.claims();
  }

  ngOnInit() {
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        let redirect_url = params.get('url');
        let redirect = atob(redirect_url);
        this.document.location.href = redirect;
      })
    );
    /*
    let redirect_url = sessionStorage.getItem('redirect_url');
    this.document.location.href = redirect_url;
    */
  }

}
