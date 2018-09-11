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
    let url = `${LOGIN_API_URL}/login/` + challenge;
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.get<string>(url, h);
  }

  aceptar_login_challenge(challenge:string):Observable<string> {
    let url = `${LOGIN_API_URL}/login/` + challenge + '/accept';
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<string>(url, h);
  }

  consent_challenge(challenge:string):Observable<string> {
    let url = `${LOGIN_API_URL}/consent/` + challenge;
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.get<string>(url, h);
  }

  aceptar_consent_challenge(challenge:string):Observable<string> {
    let url = `${LOGIN_API_URL}/consent/` + challenge + '/accept';
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<string>(url, h);
  }


  login(usuario:string, clave:string, challenge:string):Observable<string> {
    let url = `${LOGIN_API_URL}/login`;
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    let data = {
      'usuario': usuario,
      'clave': clave,
      'challenge': challenge
    }
    return this.http.post<string>(url, data, h);
  }

}
