import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, from, throwError, combineLatest } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { map, switchMap, mergeMap, share, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-check-code',
  templateUrl: './check-code.component.html',
  styleUrls: ['./check-code.component.scss']
})

export class CheckCodeComponent implements OnInit {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  accediendo = false;
  form: FormGroup;
  correo$ : Observable<String>;
  device_hash$: Observable<string>;
  _hash$: Observable<any>;

  constructor(private fb: FormBuilder, 
              private router:Router,
              private route: ActivatedRoute,
              private hardware: HardwareService,
              private service: EmailService) { 

    this.form = fb.group({
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("[0-9]+")]]
    })    

  }

  ngOnInit() {
    this.device_hash$ = this.hardware.get_device_id();
    this._hash$ = this.route.paramMap.pipe(
      map(params => {
        let h = params.get('hash');
        let h2 = atob(decodeURI(h));
        let h3 = h2.split(':');
        return {eid:h3[0], challenge:h3[1], email:h3[2]};
      })
    );
    this.correo$ = this._hash$.pipe(
      map(h => h.email)
    );
   
  }

  verificar() {
    if (!this.form.valid) {
      console.log('formulario inválido')
      return;
    }
    this.accediendo = true;
    let check$ = combineLatest(this.device_hash$, this._hash$).pipe(
      tap(v => console.log(v)),
      switchMap(params => this.service.verify_code(this.form.value['code'], params[1].eid, params[1].challenge, params[0])),
      tap(v => console.log(v))
    );

    this.subs.push(check$.subscribe(
      r => {
        this.accediendo = false;
        console.log(r);
        let ok = r.verified;
        let challenge = r.challenge;
        if (ok) {
          // sigo con el flujo de aceptación del consent
          this.router.navigate([`/consent/verify/${challenge}`]);
        } else {
          console.log('código erróneo');
        }
      },
      e => {
        this.accediendo = false;
        console.log(e);
        this.router.navigate(['/email/error']);
      }
    ));
  }


}




