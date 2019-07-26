import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  /*
    Obtiene el login_challenge generado por hydra de localstore o de los parámetros.
  */
  get_login_challenge(route:ActivatedRoute):Observable<string> {
    let c = localStorage.getItem('login_challenge');
    if (c != null) {
      return of(c);
    } else {
      return route.paramMap.pipe(
        map(params => {
          let c = params.get('challenge');
          if (c != null) {
            localStorage.setItem('login_challenge', c);
            return c;
          } else {
            localStorage.removeItem('login_challenge');
            return null;
          }
        })
      );    
    }
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
      usuario: usuario,
      clave: clave,
      challenge: challenge
    }
    return this.http.post<Response>(url, data).pipe(
      map(r => r.response)
    );
  }

  
  
}
