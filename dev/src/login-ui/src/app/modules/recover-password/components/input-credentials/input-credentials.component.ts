import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { RecoverPasswordService } from '../../services/recover-password.service';

@Component({
  selector: 'app-input-credentials',
  templateUrl: './input-credentials.component.html',
  styleUrls: ['./input-credentials.component.scss']
})
export class InputCredentialsComponent implements OnInit {


  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ver_clave = false;
  accediendo = false;
  form: FormGroup;
  device_hash$: Observable<string>;
  session: string;

  constructor(private fb: FormBuilder, 
              private router:Router, 
              private route:ActivatedRoute,
              private hardware: HardwareService,
              private service: RecoverPasswordService) { 

    this.form = fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("[a-zA-Z0-9]+")]],
      password2: ['', [Validators.required, Validators.minLength(8), Validators.pattern("[a-zA-Z0-9]+")]]
    })    
  }

  ngOnInit() {
    this.device_hash$ = this.hardware.get_device_id();
    let _hash$ = this.route.paramMap.pipe(
      map(params => params.get('hash')),
      map(h => atob(decodeURI(h))),
      //map(hash => hash.split(':')),
      map(hashes => {
        return {'session':hashes};
      })
    )
    this.subs.push(_hash$.subscribe(h => {
      this.session = h['session'];
    }));    
  }

  change() {
    if (!this.form.valid) {
      return;
    }

    this.accediendo = true;
    this.subs.push(this.device_hash$.pipe(
      switchMap(device => this.service.change_credentials(this.form.value['password'], this.session, device)),
      switchMap(hash => from(this.router.navigate([`/recover/finalize`])))
    ).subscribe(
      ok => {
        this.accediendo = false;
        console.log(ok);
      },
      e => {
        this.accediendo = false;
        console.log(e);
        this.router.navigate([`/recover/error`]);
      }
    ));    
  }

}
