import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Observable, timer, combineLatest, of, throwError } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';


import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.scss']
})
export class GenerarQrComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  url_to_redirect: string =  environment.url_to_activate_qr;
  challenge$: Observable<string>;
  device_hash$: Observable<string>;
  qr$: Observable<any>;

  constructor(private service:LoginService,
              private router: Router,
              private route:ActivatedRoute,
              @Inject(DOCUMENT) private document: any) { 

    this.challenge$ = route.paramMap.pipe(map(params => params.get('challenge')));
    this.device_hash$ = service.get_device_id();
    this.qr$ = this.obtener_qr_code(this.device_hash$, this.challenge$);
  }

  obtener_qr_code(device_hash$:Observable<string>, challenge$:Observable<string>):Observable<any> {
    return combineLatest(device_hash$, challenge$).pipe(
      switchMap(res => {
        let did = res[0];
        let challenge = res[1];
        return this.service.get_qr_code(this.url_to_redirect, did, challenge);
      })
    );
  }

  esperar_aceptacion_y_obtener_url(qr$:Observable<any>): Observable<string> | Observable<null> {
    return qr$.pipe(
      switchMap(qr => {
        return timer(1000,10000).pipe(
          switchMap(_ => this.service.get_qr_redirection(qr.code).pipe(
            catchError(err => {
              /*
                Errores posibles:
                304 --> (Not Modified) - qr pendiente -- solo en este tengo que seguir consultando
                404 --> (Not Found) - qr no existente (faltal , lo redisparo)
                410 --> (Gone) - qr ya usado (fatal, lo redisparo)
              */
              if (err instanceof HttpErrorResponse) {
                let e = <HttpErrorResponse>err;
                if (e.status == 304) {
                  return of(null);
                }
              }
              throwError(err);
            })
          ))
        )
      })
    )
  }

  ngOnInit() {
    this.subs.push(
      this.esperar_aceptacion_y_obtener_url(this.qr$).subscribe(redir => {
        console.log(redir);
        if (redir != null) {
          this.document.location.href = redir;
        }
      },
      err => {
        // en cualquier caso los errores que llegan hasta aca son fatales.
        this.router.navigate(['/login/error']);
      })
    );
  }

}
