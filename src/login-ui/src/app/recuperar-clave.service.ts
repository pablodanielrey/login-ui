import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { environment } from '../environments/environment';

import { RecuperarCorreoData, VerificarDniData, EnviarCodigoData, VerificarCodigoData } from './entities/recuperar';

const RECUPERAR_API_URL = environment.loginApiUrl + '/recuperar_clave';

@Injectable({
  providedIn: 'root'
})
export class RecuperarClaveService {

  constructor(private http: HttpClient) { }

  verificar_dni(dni: string):Observable<VerificarDniData> {
    let url = `${RECUPERAR_API_URL}/verificar_dni/` + dni;
    return this.http.get<VerificarDniData>(url);
    /*
    let r : VerificarDniData = {
      ok: true,
      error: {
        error: 500,
        descripcion: 'error interno de servidor'
      },
      tiene_correo: false,
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
    */
  }

  obtener_correo(uid:string): Observable<RecuperarCorreoData> {
    let url = `${RECUPERAR_API_URL}/obtener_correo/` + uid;
    return this.http.get<RecuperarCorreoData>(url);
    /*
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
    */
  }

  enviar_codigo(eid:string, correo:string): Observable<EnviarCodigoData> {
    let url = `${RECUPERAR_API_URL}/enviar_codigo/` + eid;
    let data = {
      correo: correo
    }
    return this.http.post<EnviarCodigoData>(url,data);
    /*    
    let r : EnviarCodigoData = {
      ok: true,
      error: null,
      iid: 'id-del-recupero'
    };
    return of(r);
    */
  }

  verificar_codigo(iid:string, codigo:string): Observable<VerificarCodigoData> {
    let url = `${RECUPERAR_API_URL}/verificar_codigo/` + iid;
    let data = {
      codigo: codigo
    }
    return this.http.post<VerificarCodigoData>(url,data);
    /*
    let r : VerificarCodigoData = {
      ok: true,
      error: null,
      clave: 'sdfdsfds'
    };
    return of(r);
    */
  }

}
