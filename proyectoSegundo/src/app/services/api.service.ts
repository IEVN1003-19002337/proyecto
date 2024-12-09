import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators"
import {IResponse, IUser, IUserRequest} from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/dashboard'; // URL base para la gestión de usuarios

  constructor(private http: HttpClient) {
  }

  // Método para obtener todos los usuarios
  getUsuarios(): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/all`).pipe(
      map(response => {
        if (response.exito) {
          return response;
        } else {
          throw new Error(response.mensaje);
        }
      }),
      catchError((error) => {
        console.error('Error al obtener usuarios', error);
        return of({exito: false, mensaje: "Error al obtener usuarios."});
      })
    )
  }

  // Método para obtener a un usuario especifico
  getUsuario(correo: string): Observable<IResponse> {
    return this.http.get<IResponse>(`${this.baseUrl}/usuarios/${correo}`).pipe(
      map(response => {
        if (response.exito) {
          return response;
        } else {
          throw new Error(response.mensaje)
        }
      }),
      catchError((error) => {
        console.error('Error alobtener el usuario', error);
        return of({exito: false, mensaje: "Error al obtener al usuario seleccionado."});
      })
    );
  }

  // Método para crear un nuevo usuario
  createUser(user: IUserRequest): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.baseUrl}/usuarios`, user).pipe(
      catchError((error) => {
        console.error('Error al crear el usuario', error);
        return of({mensaje: 'Error al registrar el usuario', exito: false});
      })
    )
  }

  // Método para actualizar un usuario existente
  updateUser(correo: string, user: IUserRequest): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.baseUrl}/usuarios/${correo}`, user).pipe(
      catchError((error) => {
        console.error('Error al crear el usuario', error);
        return of({mensaje: 'Error al modificar los datos del usuario', exito: false});
      })
    );
  }

  // Método para eliminar un usuario
  deleteUser(id: number): Observable<IResponse> {
    return this.http.delete<IResponse>(`${this.baseUrl}/usuarios/${id}`).pipe(
      catchError((error) => {
        console.error('Error al crear el usuario', error);
        return of({mensaje: 'Error al eliminar al usuario', exito: false});
      })
    );
  }

  login(email: string, password: string): Observable<IResponse> {
    const body = {correo: email, contrasena: password};
    return this.http.post<IResponse>(`${this.baseUrl}/login`, body).pipe(
      catchError((error) => {
        console.error('Error al autenticar:', error);
        return of({mensaje: 'Error al iniciar sesión', exito: false});
      })
    );
  }
}
