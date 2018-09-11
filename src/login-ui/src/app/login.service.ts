import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { Sesion } from './entities/sesion';

const LOGIN_API_URL = environment.loginApiUrl;
const SID = environment.session;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login_challenge(challenge:string):Observable<string> {
    let url = `${LOGIN_API_URL}/login_challenge/` + challenge;
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.get<string>(url, h);
  }

  login(usuario:string, clave:string):Observable<Sesion> {
    return this._login(usuario,clave).pipe(flatMap(s => this._crear_sesion(s)));
  }

  _login(usuario:string, clave:string):Observable<Sesion> {
    let url = `${LOGIN_API_URL}/login`;
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    let data = {
      'usuario': usuario,
      'clave': clave
    }
    return this.http.post<Sesion>(url, data, h);
  }

  _crear_sesion(s:Sesion):Observable<Sesion> {
    console.log('creando sesion');
    console.log(s);
    localStorage.setItem(SID, s.session);
    return of(s);
  }

  chequear_sesion():Observable<string> {
    let sid = localStorage.getItem(SID);
    if (sid) {
      return of(sid);
    }
    return throwError('sesión no definida');
  }
}
