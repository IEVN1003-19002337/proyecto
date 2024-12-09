import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {IResponse, IUser, IUserLogin, IUserRequest} from "../models/user.model";

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin-users.component.html', // Referencia al archivo HTML
  styleUrls: ['./admin-users.component.css'] // Si tienes estilos específicos
})
export class AdminUsersComponent implements OnInit {
  users: IUser[] = [];
  newUser: IUserRequest = { nombre_usuario: '', contrasena: '', tipo_cuenta: '' };
  editUser: IUserRequest = { nombre_usuario: '', contrasena: '', tipo_cuenta: '' };
  oldUserName: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getUsuarios().subscribe({
      next: (response: IResponse) => {
        if (response.exito) {
          this.users = response.usuarios ?? [];
        } else {
          console.error('Error al cargar usuarios: ', response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    });
  }

  addUser (): void {
    this.apiService.createUser(this.newUser).subscribe({
      next: (response:IResponse) => {
        if (response.exito) {
          this.newUser = { nombre_usuario: '', contrasena: '', tipo_cuenta: '' }; // Limpiar campos
          this.loadUsers();
        } else {
          console.error('Error al agregar usuario:', response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al agregar usuario:', error);
      }
    })
  }

  setEditUser (user: IUserRequest): void {
    this.editUser = { ...user }; // Carga los datos del usuario en el formulario de edición
    this.oldUserName = user.nombre_usuario;
  }


updateUser(): void {
    if (!this.editUser.nombre_usuario) return;

    this.apiService.updateUser(this.oldUserName, this.editUser).subscribe({
      next: (response: IResponse) => {
        if (response.exito) {
          this.loadUsers();
          this.editUser = { nombre_usuario: '', contrasena: '', tipo_cuenta: '' }; // Limpiar campos
          this.oldUserName = '';
        } else {
          console.error('Error al actualizar usuario:', response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al actualizar usuario: ', error);
      }
    })
  }

  deleteUser (id: number): void {
    this.apiService.deleteUser(id).subscribe({
      next: (response: IResponse) => {
        if (response.exito) {
          this.loadUsers();
        } else {
          console.error('Error al eliminar usuario:', response.mensaje);
        }
      },
      error: (error) => {
        console.error('Error al eliminar usuario: ', error);
      }
    });
  }
}
