import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError, tap, retry } from 'rxjs/operators';
import { of, Observable, combineLatest, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-verificar-dispositivo',
  templateUrl: './verificar-dispositivo.component.html',
  styleUrls: ['./verificar-dispositivo.component.scss']
})
export class VerificarDispositivoComponent implements OnInit, OnDestroy {

  version = environment.version;
  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  mensaje : string = '';

  device_hash$: Observable<string>;
  challenge$: Observable<string>;
  login_challenge$: Observable<any>;

  constructor(private service:LoginService,
              private hardware:HardwareService,
              private router:Router, 
              private route:ActivatedRoute,
              private http:HttpClient,
              @Inject(DOCUMENT) private document: any) { 

    /*
    this.device_hash$ = this.hardware.get_device_id();
    this.challenge$ = this.route.paramMap.pipe(map(params => params.get('challenge')));
    this.login_challenge$ = combineLatest(
      this.challenge$,
      this.device_hash$
    ).pipe(
      switchMap(rs => {
        let challenge = rs[0];
        let did = rs[1];
        return this.service.get_login_challenge(did, challenge);
      })
    )
    */

    this.login_challenge$ = this.route.paramMap.pipe(
      map(params => params.get('challenge')),
      switchMap(challenge => this.service.get_login_challenge(null, challenge))
    )
  }

  handleError(error) {
    console.log(error);
    let message = '';
    if (error instanceof Error) {
      message = error.message ? error.message : error.toString();
    } else if (error instanceof HttpErrorResponse) {
      message = error.statusText;
    }
    if (message == null || message == '') {
      message = error.toString();
    }
    this.router.navigate([`/login/error/${message}`]).then(v => console.log('navegación exitosa'));
  }
  

  

  ngOnInit() {
    this.mensaje = 'Verificando Dispositivo';
    this.subs.push(
      this.login_challenge$.subscribe(r => {
        this.mensaje = 'Analizando Requerimiento';
        let c = r.response;
        try {
          if (c['skip']) {
            // se aceptó el challenge implicitamente, hay que saltar todo el paso de login.
            let redirect_url = c['redirect_to'];
            this.document.location.href = redirect_url;
          } else {
            // el usuario tiene que loguearse.
            let challenge = c['challenge'];
            this.router.navigate([`/login/login/${challenge}`]);
          }
        } catch(e) {
          console.log(e);
          let message = 'Formato de retorno incorrecto';
          this.router.navigate([`/login/error/${message}`]).then(v => console.log('navegación exitosa'));
        }
      },
      e => {
        this.handleError(e);
      })
    )
  }

}
