import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  message: any = null;

  constructor(private auth: AuthService, 
              private route:ActivatedRoute) { 
  }

  ngOnInit() {

    let is_auth$ = this.auth.is_authenticated()
    let read_tokens$ = this.auth.read_tokens_from_url()

    this.subs.push(
      is_auth$.pipe(
        switchMap(b => b ? of(b) : read_tokens$)
      ).subscribe(b => {
        if (!b) {
          console.log('iniciando el flujo de login');
          this.auth.login();
        } else {
          this.message = this.auth.claims();
        }
      })
    )

  }

  salir() {
    this.auth.logout();
  }

}
