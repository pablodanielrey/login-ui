
export interface ErrorData {
    error: number;
    descripcion: string;
}

export interface UsuarioData {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    tipo: string;
    sexo: string;
}

export interface CorreoData {
    id: string;
    ayuda: string;
}

export interface RecuperarCorreoData {
    ok: boolean;
    usuario: UsuarioData;
    correo: CorreoData;
    error: ErrorData;
}

export interface VerificarDniData {
    ok: boolean;
    usuario: UsuarioData;
    tiene_correo: boolean;
    error: ErrorData;
}

export interface EnviarCodigoData {
    ok: boolean;
    error: ErrorData;
    iid: string;
}

export interface VerificarCodigoData {
    ok: boolean,
    error: ErrorData,
    clave: string
}

export interface CambiarClaveData {
    clave: string;
}