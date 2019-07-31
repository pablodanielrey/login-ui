import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Observable, timer, combineLatest, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

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

  challenge$: Observable<string>;
  device_id$: Observable<string>;
  redirect_url$: Observable<string>;

  qr_datauri: string = null;
  qr_code: string = null;

  constructor(private service:LoginService,
              private route:ActivatedRoute,
              @Inject(DOCUMENT) private document: any) { 

    this.challenge$ = route.paramMap.pipe(map(params => params.get('challenge')));
    this.device_id$ = service.get_device_id();

    let qr$ = combineLatest(this.device_id$, this.challenge$).pipe(
      switchMap(res => {
        let did = res[0];
        let challenge = res[1];
        return service.get_qr_code(did, challenge);
      })
    ).subscribe(qr => {
        this.qr_datauri = qr['qr_datauri'];
        this.qr_code = qr['code'];
    });
    
    this.redirect_url$ = timer(1000,10000).pipe(
      switchMap(_ => {
        if (this.qr_code == null) {
          return of(null);
        }
        return this.service.get_qr_redirection(this.qr_code).pipe(map(r => {
          if (r['redirect_to'] != undefined) {
            return r['redirect_to'];
          } else {
            return null;
          }
        }))
      })
    );
  }

  ngOnInit() {
    this.subs.push(
      this.redirect_url$.subscribe(redir => {
        console.log(redir);
        if (redir != null) {
          this.document.location.href = redir;
        }
      })
    );
  }

}
