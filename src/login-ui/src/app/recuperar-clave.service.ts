import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { RecuperarCorreoData } from './entities/recuperar';

@Injectable({
  providedIn: 'root'
})
export class RecuperarClaveService {

  constructor() { }

  obtener_correo(dni:string): Observable<RecuperarCorreoData> {
    let rr : RecuperarCorreoData = {
      nombre: '',
      apellido: '',
      tip: ''
    };
    return of(rr);
  }
}
