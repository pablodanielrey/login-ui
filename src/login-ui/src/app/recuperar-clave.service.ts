import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { RecuperarCorreoData, VerificarDniData } from './entities/recuperar';

@Injectable({
  providedIn: 'root'
})
export class RecuperarClaveService {

  constructor() { }

  verificar_dni(dni: string):Observable<VerificarDniData> {
    let r : VerificarDniData = {
      ok: true,
      error: null,
      usuario: {
        id: 'asdsad',
        nombre: 'prueba',
        apellido: 'prueba',
        dni: '123213',
        tipo: 'estudiante'
      }
    }
    return of(r);
  }

  obtener_correo(uid:string): Observable<RecuperarCorreoData> {
    let rr : RecuperarCorreoData = {
      ok: true,
      error: null,
      correo: {
        id: 'dsfdsf',
        ayuda: 'asdl***@gma**.com'
      },
      usuario: {
        id: 'asdsad',
        nombre: 'prueba',
        apellido: 'prueba',
        dni: '123213',
        tipo: 'estudiante'
      }
    };
    return of(rr);
  }

  enviar_codigo(uid:string, correo:string): Observable<boolean> {
    return of(false);
  }

}
