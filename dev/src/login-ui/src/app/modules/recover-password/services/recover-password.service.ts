import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  recover_for(user:string, device:string) : Observable<string> {
    let url = `${this.url}/recover/${user}`;
    let data = {
      device: device
    }
    return this.http.post<Response>(url, data).pipe(
      map(r => r.response)
    );    
  }

}
