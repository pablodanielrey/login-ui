import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { EmailService } from '../../services/email.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-analize',
  templateUrl: './analize.component.html',
  styleUrls: ['./analize.component.scss']
})
export class AnalizeComponent implements OnInit {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private hardware: HardwareService,
              private service: EmailService) { 
      
  }

  ngOnInit(): void {

    let analize$ = this.route.paramMap.pipe(
      map(params => params.get('challenge')),
      switchMap(challenge => this.service.analize(challenge))
    )

    this.subs.push(analize$.subscribe(
      r => {
        let challenge = r['challenge'];
        if (r['configure']) {
          this.router.navigate([`/email/email/${challenge}`]);
        } else {
          // no hace falta configurar correo, asi que se sigue con el proceso de aceptación.
          this.router.navigate([`/consent/verify/${challenge}`]);
        }
      },
      e => {
        this.router.navigate(['/email/error']);
      }
    ));

  }

}
