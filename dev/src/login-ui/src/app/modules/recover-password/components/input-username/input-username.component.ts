import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { Observable, from } from 'rxjs';
import { RecoverPasswordService } from '../../services/recover-password.service';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-input-username',
  templateUrl: './input-username.component.html',
  styleUrls: ['./input-username.component.scss']
})
export class InputUsernameComponent implements OnInit {

  accediendo = false;
  form: FormGroup;
  device_hash$: Observable<string>
  error: string = null;

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }


  constructor(private fb: FormBuilder, 
              private router:Router,
              private hardware: HardwareService,
              private service: RecoverPasswordService) { 

    this.form = fb.group({
      user: ['', [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Z0-9]+")]]
    })    

  }

  ngOnInit() {
    this.device_hash$ = this.hardware.get_device_id();
  }

  verify() {
    if (!this.form.valid) {
      console.log('error formulário inválido');
      return;
    }
    this.error = null;
    this.device_hash$.pipe(
      switchMap(hash => this.service.recover_for(this.form.value['user'], hash)),
      map(r => encodeURI(btoa(r.user + ":" + r.email))),
      switchMap(hash => from(this.router.navigate([`/recover/code/${hash}`]))),
      tap(v => console.log(v))
    ).subscribe(
      ok => {
        this.error = null;
        this.accediendo = false;
        console.log(ok);
      },
      e => {
        this.error = e.message;
        this.accediendo = false;
        console.log(e);
      }
    );
  }

}
