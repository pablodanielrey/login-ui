import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const LOGIN_API_URL = environment.loginApiUrl;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(usuario:string, clave:string):Observable<string> {
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
    return this.http.post<string>(url, data, h);
  }

}
