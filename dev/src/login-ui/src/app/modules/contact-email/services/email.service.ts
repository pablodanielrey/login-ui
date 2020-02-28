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

  configure(email:string, device:string): Observable<any> {
    return this.auth.claims().pipe(
      map(claims => claims['preferred_username']),
      switchMap(user => {
        let url = `${this.url}/configure/${user}`;
        let data = {
          device: device,
          email: email,
          user: user
        }
        return this.http.post<Response>(url, data, {
          headers: new HttpHeaders().set('content-type', 'application/json')
        })
      }),
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

  verify_code(code:string, eid:string, device:string): Observable<boolean> {
    return of(false);
  }

}
