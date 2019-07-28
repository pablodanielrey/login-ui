import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


interface Response {
  status:number,
  response:any
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url : string;

  constructor(private http: HttpClient) { 
    this.url = environment.loginApiUrl;
  }

  get_login_challenge(route:ActivatedRoute): Observable<any> {
    return route.paramMap.pipe(
      switchMap(p => {
        let challenge = p.get('challenge');
        let url = `${this.url}/challenge/${challenge}`;
        return this.http.get<Response>(url).pipe(
          map(r => r.response),
          tap(v => console.log(v))
        );
      })
    )
  }

  /*
    Obtiene un device_id de localStorage o accede al servidor para generar uno
  */
  get_device_id(challenge:string): Observable<string> {
    let d = localStorage.getItem('device_id');
    if (d != null) {
      return of(d);
    }
    let url = `${this.url}/device/${challenge}`;
    return this.http.get<Response>(url).pipe(
      map(r => r.response),
      tap(d => localStorage.setItem('device_id',d))
    );
  }

  login(usuario:string, clave:string, challenge:string): Observable<Response> {
    let url = `${this.url}/login`;
    let data = {
      user: usuario,
      password: clave,
      challenge: challenge
    }
    return this.http.post<Response>(url, data).pipe(
      map(r => r.response)
    );
  }

  get_consent_challenge(route:ActivatedRoute): Observable<any> {
    return route.paramMap.pipe(
      switchMap(p => {
        let challenge = p.get('challenge');
        let url = `${this.url}/consent/${challenge}`;
        return this.http.get<Response>(url).pipe(
          map(r => r.response),
          tap(v => console.log(v))
        );
      })
    )
  }
  
}
