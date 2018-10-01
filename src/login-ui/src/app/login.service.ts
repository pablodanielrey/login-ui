import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

import { environment } from '../environments/environment';

import { LoginFlow, ConsentFlow } from './entities/login';

const LOGIN_API_URL = environment.loginApiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  /*
    Método que inicia el flujo de login. solo es para reducir las idas y vueltas al servidor.
  */
  init_login_flow(challenge:string):Observable<LoginFlow> {
    let url = `${LOGIN_API_URL}/init_login_flow/` + challenge;
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.get<LoginFlow>(url, h);
  }

  login(usuario:string, clave:string, challenge:string):Observable<LoginFlow> {
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
    return this.http.post<LoginFlow>(url, data, h);
  }

  init_consent_flow(challenge:string):Observable<ConsentFlow> {
    let url = `${LOGIN_API_URL}/init_consent_flow/` + challenge;
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.get<ConsentFlow>(url, h);
  }


  /*
    funciones de adminsitracion
  */

  user_sessions(uid:string):Observable<string[]> {
    let url = `${LOGIN_API_URL}/sessions/` + uid;
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.get<string[]>(url, h);
  }

  delete_user_sessions(uid:string):Observable<string[]> {
    let url = `${LOGIN_API_URL}/sessions/` + uid;
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.delete<string[]>(url, h);
  }

  delete_user_client_sessions(uid:string, cid:string):Observable<string[]> {
    let url = `${LOGIN_API_URL}/sessions/` + uid + '/' + cid;
    let h = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.delete<string[]>(url, h);
  }


  /*
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
  */



}
