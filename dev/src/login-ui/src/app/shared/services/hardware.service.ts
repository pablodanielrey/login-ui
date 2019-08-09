import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment} from '../../../environments/environment';

export interface Response {
  status:number,
  response:any
}

@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  private url: string = null;

  constructor(private http: HttpClient) { 
    this.url = environment.hardwareApiUrl;
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

}
