import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent implements OnInit {

  private challenge$: Observable<String>;

  constructor(private route:ActivatedRoute,
              private router:Router) { 
      this.challenge$ = route.queryParamMap.pipe(
        map(params => params.get('consent_challenge')),
        map(challenge => {
          if (challenge == null) {
            throw 'Id inválido';
          }
          return challenge;
        })
      )
  }

  ngOnInit() {
    this.challenge$.subscribe(challenge => {
      //this.router.navigate([`/consent/verify/${challenge}`]);
      // es necesario que tengan el mail alternativo confirmado.
      this.router.navigate([`/email/analize/${challenge}`]);
    },
    e => {
      console.log(e);
      let message = e;
      this.router.navigate([`/login/error/${message}`]).then(v => console.log('navegación exitosa'));
    })
  }

}
