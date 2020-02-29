import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HardwareService } from 'src/app/shared/services/hardware.service';

import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { catchError, switchMap, map } from 'rxjs/operators';

export interface Response {
  status:number,
  response:any
}


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  url: string = null;

  constructor(private http: HttpClient, 
              private hardare: HardwareService,
              private auth: AuthService) { 
    this.url = environment.emailApiUrl;
  }


  analize(challenge:string): Observable<Response> {
    let url = `${this.url}/analize/${challenge}`;
    let data = {
    }
    return this.http.post<Response>(url, data, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    }).pipe(
      catchError(e => of({status:500,response:''})),
      switchMap(r => {
        if (r.status >= 500 && r.status <= 600) {
          return throwError(new Error('Ups!. algo ha salido mal'));
        }
        if (r.status != 200) {
          return throwError(new Error(r.response));
        }
        return of(r.response);
      })      
    ); 
  }

  configure(challenge: string, email:string, device:string): Observable<any> {
      let url = `${this.url}/configure`;
      let data = {
        device: device,
        email: email,
        challenge: challenge
      }
      return this.http.post<Response>(url, data, {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }).pipe(
        catchError(e => of({status:500,response:''})),
        switchMap(r => {
          if (r.status >= 500 && r.status <= 600) {
            return throwError(new Error('Ups!. algo ha salido mal'));
          }
          if (r.status != 200) {
            return throwError(new Error(r.response));
          }
          return of(r.response);
        })
      );
  }

  verify_code(code:string, eid:string, challenge: string, device:string, email:string): Observable<any> {
    let url = `${this.url}/verify_code/${code}`;
    let data = {
      device: device,
      eid: eid,
      challenge: challenge,
      email:email
    }
    return this.http.post<Response>(url, data, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    }).pipe(
      catchError(e => of({status:500,response:''})),
      switchMap(r => {
        if (r.status >= 500 && r.status <= 600) {
          return throwError(new Error('Ups!. algo ha salido mal'));
        }
        if (r.status != 200) {
          return throwError(new Error(r.response));
        }
        return of(r.response);
      })
    );
  }

}
