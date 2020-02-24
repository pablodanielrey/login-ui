import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { Observable, throwError, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

export interface Response {
  status:number,
  response:any
}


@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {

  url: string = null;

  constructor(private http: HttpClient, private hardare: HardwareService) { 
    this.url = environment.recoverApiUrl;
  }

  recover_for(user:string, device:string) : Observable<any> | Observable<never> {
    let url = `${this.url}/recover/${user}`;
    let data = {
      "device": device
    }
    return this.http.post<Response>(url, data, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    }).pipe(
      switchMap(r => {
        if (r.status == 500) {
          return throwError(new Error('Ups!. algo ha salido mal'));
        }
        if (r.status != 200) {
          return throwError(new Error(r.response));
        }
        return of(r.response);
      }),
    );    
  }

  verify_code(code:string, user:string, device:string) {
    let url = `${this.url}/verify_code/${code}`;
    let data = {
      "user": user,
      "device": device
    }
    return this.http.post<Response>(url, data, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    }).pipe(
      switchMap(r => {
        if (r.status == 500) {
          return throwError(new Error('Ups!. algo ha salido mal'));
        }
        if (r.status != 200) {
          return throwError(new Error(r.response));
        }
        return of(r.response);
      }),
    );    
  }

  change_credentials(credentials:string, session:string, device:string) {
    let url = `${this.url}/credentials`;
    let data = {
      "session": session,
      "device": device,
      "credentials": credentials
    }
    return this.http.post<Response>(url, data, {
      headers: new HttpHeaders().set('content-type', 'application/json')
    }).pipe(
      switchMap(r => {
        if (r.status == 500) {
          return throwError(new Error('Ups!. algo ha salido mal'));
        }
        if (r.status != 200) {
          return throwError(new Error(r.response));
        }
        return of(r.response);
      }),
    );    
  }  
}
