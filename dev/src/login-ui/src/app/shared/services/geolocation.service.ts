import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  get_geolocation_permission(): Observable<boolean> {
    return from(navigator.permissions.query({name:'geolocation'})).pipe(
      map(result => {
        if (result.state == 'granted') {
          return true;
        }
        if (result.state == 'prompt') {
          return false;
        }
        return false;
      })
    )
  }

  get_geolocation(): Observable<Position> {
    let e$ = this.get_geolocation_permission().pipe(
      switchMap(b => {
        if (b && navigator.geolocation) {
          let geolocation$:Observable<Position> = Observable.create(obs => {
            navigator.geolocation.getCurrentPosition(pos => {
              obs.next(pos);
              obs.complete();
            }, 
            obs.error.bind(obs))
          });
          return geolocation$;
        } else {
          return of(null);
        }
      })
    );
    return e$;
  }
    
}
