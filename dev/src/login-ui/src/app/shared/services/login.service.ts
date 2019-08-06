import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable, of, combineLatest } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';



export interface Response {
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

  get_qr_code(url_to_redirect:string, device_hash:string, challenge:string): Observable<any> {
    let url = `${this.url}/qrcode/${device_hash}`;
    let data = {
      redirect: url_to_redirect,
      challenge: challenge
    }
    return this.http.post<Response>(url, data).pipe(
      map(r => r.response)
    );
  }


  get_login_challenge(device_hash:string, challenge:string): Observable<any> {
    let did = {'device_hash':device_hash};
    let url = `${this.url}/challenge/${challenge}`;
    return this.http.post<Response>(url, did).pipe(
      map(r => r.response)
    );
  }

  _get_hardware_data() {
    let n = window.navigator;
    let data = {
      'platform': n.platform,
      'user_agent': n.userAgent,
      'app_name': n.appName,
      'code_name': n.appCodeName,
      'product': n.product,
      'app_version': n.appVersion,
      'language': n.language,
      'on_line': n.onLine
    }
    return data;
  }

  /*
    Obtiene un device_id de localStorage o accede al servidor para generar uno
  */
  get_device_id(): Observable<string> {
    let d = localStorage.getItem('device_hash');
    if (d != null) {
      return of(d);
    }
    let url = `${this.url}/device`;
    let data = this._get_hardware_data();
    return this.http.post<Response>(url, data).pipe(
      map(r => r.response),
      map(d => {
        let id = d['device_hash'];
        localStorage.setItem('device_hash',id);
        return id;
      })
    );
  }

  get_user_hash(user:string): Observable<string> {
    let hs = this._get_users_hashes();
    for (let i = 0; i < hs.length; i++) {
      let o = hs[i];
      if (o.user == user) {
        return of(o.hash);
      }
    }
    return of(null);
  }

  get_qr_redirection(qr:string): Observable<Response> {
    let url = `${this.url}/login_qrcode/${qr}`;
    return this.http.get<Response>(url).pipe(
      map(r => r.response)
    );
  }

  login_hash(qr:string, hash:string, device_id:string): Observable<Response> {
    let url = `${this.url}/login_qrcode/${qr}`;
    let data = {
      hash: hash,
      device_id: device_id
    }
    return this.http.post<Response>(url, data).pipe(
      map(r => r.response)
    );
  }


   login(usuario:string, clave:string, device_id:string, challenge:string): Observable<Response> {
    let url = `${this.url}/login`;
    let data = {
      user: usuario,
      password: clave,
      challenge: challenge,
      device_id: device_id
    }
    return this.http.post<Response>(url, data).pipe(
      /*
      catchError((err:HttpErrorResponse) => {
        let r:Response = err.error;
        return of(r);
      }),*/
      map(r => {
        let resp = r.response;
        // almacena en locastore el hash en caso de que no exista
        let h = resp['hash'];
        if (h != null) {
          let _hs = this._get_users_hashes();
          let found = false;
          _hs.forEach(_h => {
            if (h.user == usuario) {
              found = true;
            }
          });
          if (!found) {
            _hs.push({user:usuario, hash:h});
            this._set_users_hashes(_hs);
          }
        }
        return resp;
      })
    );
  }

  _set_users_hashes(hs:[]) {
    let h = JSON.stringify(hs);
    localStorage.setItem('users_hashes',h);
  }

  _get_users_hashes() {
    let hs = localStorage.getItem('users_hashes')
    if (hs == null) {
      return [];
    }
    return JSON.parse(hs);
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
