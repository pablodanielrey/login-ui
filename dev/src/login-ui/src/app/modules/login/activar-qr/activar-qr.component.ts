import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, combineLatest, throwError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-activar-qr',
  templateUrl: './activar-qr.component.html',
  styleUrls: ['./activar-qr.component.scss']
})
export class ActivarQrComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }


  device: string;
  code$: Observable<string>;
  hash: string;
  
  constructor(private service:LoginService, 
              private route: ActivatedRoute) { 
    this.code$ = this.obtener_codigo();
  }

  obtener_codigo() {
    return this.route.paramMap.pipe(map(params => params.get('code')));
  }

  obtener_device() {
    return this.service.get_device_id().pipe(tap(h => this.device = h));
  }

  obtener_hash() {
    return this.service.get_user_hash().pipe(tap(h => this.hash = h));
  }

  activar() {
    this.subs.push(
      combineLatest(this.code$, 
                    this.obtener_device(),
                    this.obtener_hash()).pipe(
        switchMap(rs => {
          let code = rs[0];
          let did = rs[1];
          let hash_ = rs[2];
          if (code == null || did == null || hash_ == null) {
            throwError('Parámetros faltantes');
            return of(null);
          }
          return this.service.login_hash(code, hash_, did);
        })
      ).subscribe(r => {
        console.log(r);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          let e = <HttpErrorResponse>err;
          // ver que hago.
        }
      })
    );
  }

  ngOnInit() {
  }

}