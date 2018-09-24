import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { RecuperarCorreoData, VerificarDniData, EnviarCodigoData, VerificarCodigoData } from './entities/recuperar';

@Injectable({
  providedIn: 'root'
})
export class RecuperarClaveService {

  constructor() { }

  verificar_dni(dni: string):Observable<VerificarDniData> {
    let r : VerificarDniData = {
      ok: true,
      error: {
        error: 500,
        descripcion: 'error interno de servidor'
      },
      usuario: {
        id: 'asdsad',
        nombre: 'prueba',
        apellido: 'prueba',
        dni: '123213',
        tipo: 'estudiante',
        sexo: 'masculino'
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
        tipo: 'estudiante',
        sexo: 'masculino'
      }
    };
    return of(rr);
  }

  enviar_codigo(uid:string, correo:string): Observable<EnviarCodigoData> {
    let r : EnviarCodigoData = {
      ok: true,
      error: null,
      iid: 'id-del-recupero'
    };
    return of(r);
  }

  verificar_codigo(iid:string, codigo:string): Observable<VerificarCodigoData> {
    let r : VerificarCodigoData = {
      ok: true,
      error: null,
      clave: 'sdfdsfds'
    };
    return of(r);
  }

}
