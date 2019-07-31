import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of, Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-verificar-dispositivo',
  templateUrl: './verificar-dispositivo.component.html',
  styleUrls: ['./verificar-dispositivo.component.scss']
})
export class VerificarDispositivoComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  mensaje : string = '';

  device_id$: Observable<string>;
  challenge$: Observable<string>;
  login_challenge$: Observable<any>;

  constructor(private service:LoginService, 
              private router:Router, 
              private route:ActivatedRoute) { 

    this.device_id$ = this.service.get_device_id();
    this.challenge$ = this.route.paramMap.pipe(map(params => params.get('challenge')));
    this.login_challenge$ = combineLatest(
      this.challenge$,
      this.device_id$
    ).pipe(
      switchMap(rs => {
        let challenge = rs[0];
        let did = rs[1];
        return this.service.get_login_challenge(did, challenge);
      })
    )

  }
  
  ngOnInit() {
    this.mensaje = 'Verificando Dispositivo';
    this.subs.push(
      this.login_challenge$.subscribe(c => {
        this.mensaje = 'Analizando Requerimiento';
        if (c['skip']) {
          // se acepta implícitamente el challenge así que ya redirecciono
          this.router.navigate(['/login/bienvenido']);
        } else {
          let challenge = c['challenge'];
          this.router.navigate([`/login/login/${challenge}`]);
        }
      },
      err => {
        this.router.navigate(['/login/error']);
      })
    )
  }

}
