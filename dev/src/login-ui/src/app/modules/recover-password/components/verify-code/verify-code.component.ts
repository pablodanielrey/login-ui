import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of, pipe, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { RecoverPasswordService } from '../../services/recover-password.service';
import { HardwareService } from 'src/app/shared/services/hardware.service';

interface param {
  session: string,
  email: string
}

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  accediendo = false;
  form: FormGroup;
  correo: string;
  session: string;
  device_hash$: Observable<string>;
  error: boolean = false;

  constructor(private fb: FormBuilder, 
              private router:Router, 
              private route: ActivatedRoute, 
              private service: RecoverPasswordService,
              private hardware: HardwareService) { 

    this.form = fb.group({
      code: ['', [Validators.required, Validators.minLength(8), Validators.pattern("[a-zA-Z0-9]+")]]
    })    

  }

  ngOnInit() {
    this.device_hash$ = this.hardware.get_device_id();
    let _hash$ = this.route.paramMap.pipe(
      map(params => params.get('hash')),
      tap(v => console.log(v)),
      map(h => atob(decodeURI(h))),
      tap(v => console.log(v)),
      map(hash => hash.split(':')),
      tap(v => console.log(v)),
      map(hashes => {
        return {'session':hashes[0], 'email':hashes[1]};
      })
    )
    this.subs.push(_hash$.subscribe(h => {
      this.correo = h['email'];
      this.session = h['session'];
    }));
  }

  verificar() {
    if (!this.form.valid) {
      return;
    }
    this.accediendo = true;
    this.subs.push(this.device_hash$.pipe(
      switchMap(device => {this.error = false; return this.service.verify_code(this.form.value['code'], this.session, device)}),
      map(r => encodeURI(btoa(r.session))),
      switchMap(hash => from(this.router.navigate([`/recover/credentials/${hash}`])))
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
