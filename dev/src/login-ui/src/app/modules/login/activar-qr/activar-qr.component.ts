import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';

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

  code$: Observable<string>;
  device_id$: Observable<string>;
  hash$: Observable<string>;

  constructor(private service:LoginService, 
              private route: ActivatedRoute) { 
    
    this.code$ = route.paramMap.pipe(map(params => params.get('code')));
    this.device_id$ = this.service.get_device_id();
    this.hash$ = this.service.get_user_hash();
  }

  ngOnInit() {
    this.subs.push(
      combineLatest(this.code$, this.device_id$, this.hash$).pipe(
        switchMap(rs => {
          let code = rs[0];
          let did = rs[1];
          let hash_ = rs[2];
          return this.service.login_hash(code, hash_, did);
        })
      ).subscribe(r => {
        console.log(r);
      })
    );
  }

}
