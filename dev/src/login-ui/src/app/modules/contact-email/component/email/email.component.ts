import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { Observable, from } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { EmailService } from '../../services/email.service';
import { strict } from 'assert';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  accediendo = false;
  form: FormGroup;
  device_hash$: Observable<string>;
  challenge$: Observable<string>;
  error: string = null;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private route: ActivatedRoute,
              private hardware: HardwareService,
              private service: EmailService) { 

    this.form = fb.group({
      email: ['', [Validators.required, Validators.email ]],
      email2: ['', [Validators.required, Validators.email ]]
    })    

  }

  ngOnInit() {
    this.device_hash$ = this.hardware.get_device_id();
    this.challenge$ = this.route.paramMap.pipe(map(params => params.get('challenge')));
  }

  verify() {
    if (!this.form.valid) {
      console.log('formulario inválido')
      return;
    }
    this.error = null;
    this.device_hash$.pipe(
      switchMap(device => this.service.configure(this.form.value['email'], device)),
      map(r => encodeURI(btoa(r + ':' + this.form.value['email']))),
      switchMap(hash => from(this.router.navigate([`/email/verify_code/${hash}`]))),
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
















