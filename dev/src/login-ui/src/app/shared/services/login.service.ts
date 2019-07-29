import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable, of, combineLatest } from 'rxjs';
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
    let device_id$ = this.get_device_id();
    let challenge$ = route.paramMap.pipe(map(p => p.get('challenge')));
    return combineLatest(device_id$, challenge$).pipe(
      switchMap(rs => {
        let did = {'device_id':rs[0]};
        let challenge = rs[1];
        let url = `${this.url}/challenge/${challenge}`;
        return this.http.post<Response>(url, did).pipe(
          map(r => r.response)
        );
      })
    )
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
    let d = localStorage.getItem('device_id');
    if (d != null) {
      return of(d);
    }
    let url = `${this.url}/device`;
    let data = this._get_hardware_data();
    return this.http.post<Response>(url, data).pipe(
      map(r => r.response),
      map(d => {
        let id = d['device_id'];
        localStorage.setItem('device_id',id);
        return id;
      })
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
