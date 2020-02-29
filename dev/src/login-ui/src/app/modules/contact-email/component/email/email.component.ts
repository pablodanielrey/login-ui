import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { Observable, from, combineLatest } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { EmailService } from '../../services/email.service';
import { strict } from 'assert';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  constructor(private fb: FormBuilder, 
              private snack: MatSnackBar,
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

    let email1 = this.form.value['email'];
    let email2 = this.form.value['email2'];
    if (email1 != email2) {
      this.snack.open('Verfique el correo ingresado','Cerrar');
      return;
    }


    combineLatest(this.device_hash$, this.challenge$).pipe(
      switchMap(data => {
        let device = data[0];
        let challenge = data[1];
        return this.service.configure(challenge, this.form.value['email'], device).pipe(
          map(r => encodeURI(btoa(r + ':' + challenge + ':' + this.form.value['email'])))
        )
      }),
      switchMap(hash => from(this.router.navigate([`/email/verify_code/${hash}`]))),
      tap(v => console.log(v))
    ).subscribe(
      ok => {
        this.accediendo = false;
        console.log(ok);
      },
      e => {
        this.accediendo = false;
        console.log(e);
        this.snack.open(e.message,'Cerrar');
      }
    );
  }

}
















