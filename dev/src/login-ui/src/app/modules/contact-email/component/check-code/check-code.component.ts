import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { map, switchMap, mergeMap, share, tap } from 'rxjs/operators';

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
  error: boolean = false;

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
        return {eid:h3[0], email:h3[1]};
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
    this.subs.push(this.device_hash$.pipe(
      mergeMap(device => this._hash$.pipe(
        map(hash => {
          this.error = false;
          return {device:device, hash:hash.eid};
        })
      )),
      tap(v => console.log(v)),
      switchMap(params => {
          console.log(params);
          return this.service.verify_code(this.form.value['code'], params.hash, params.device);
      }),
      tap(v => console.log(v)),
      mergeMap(ok => {
        if (ok) {
          return from(this.router.navigate([`/email/finalize`]));
        } else {
          return from(this.router.navigate(['/email/error']));
        }
      }),
      tap(v => console.log(v)),
    ).subscribe(
      ok => {
        this.accediendo = false;
        console.log(ok);
      },
      e => {
        this.error = true;
        this.accediendo = false;
        console.log(e)
      }
    ));
  }


}




