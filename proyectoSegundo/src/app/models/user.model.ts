export interface IUser {
  ID: number,
  nombre_usuario: string
  tipo_cuenta: string,
  tiempo_registro: string
}

export interface IUserRequest {
  nombre_usuario: string,
  contrasena: string,
  tipo_cuenta: string
}

export interface IUserLogin {
  correo: string;
  contrasena: string
}

export interface IResponse {
  usuarios? : IUser[];
  usuario?: IUser | IUserLogin;
  mensaje: string;
  exito: boolean;
}

