import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private router:Router) { 

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      let challenge = p.get('consent_challenge');

      if (!challenge) {
        /*
          TODO: WAlter aca hay que mostrar algun error de requerimineto inválido en vez de redirigir.,
        */
        window.location.href = 'https://www.au24.econo.unlp.edu.ar';
      }

      //this.router.navigate([`/consent/verify/${challenge}`]);
      // es necesario que tengan el mail alternativo confirmado.
      this.router.navigate([`/email/analize/${challenge}`]);
    })
  }

}
