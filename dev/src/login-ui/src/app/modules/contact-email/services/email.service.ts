import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  configure(email:string, device:string): Observable<string> {
    return of("asdsadsadsadsads");
  }

  verify_code(code:string, eid:string, device:string): Observable<boolean> {
    return of(false);
  }

}
