import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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
