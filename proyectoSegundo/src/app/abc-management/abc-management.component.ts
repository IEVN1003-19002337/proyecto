import {Component, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';
import {IUser} from "../models/user.model";

@Component({
  selector: 'app-abc-management',
  standalone: true,
  imports: [],
  templateUrl: './abc-management.component.html',
  styleUrl: './abc-management.component.css'
})
export class AbcManagementComponent implements OnInit{

  usuarios: IUser[] = [];
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.apiService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('Usuarios: ', this.usuarios);
      },
      error: (error) => {
        this.errorMessage = 'Ocurrió un error al obtener los usuarios.';
        console.error('Error al obtener usuarios:', error);
      }
    })
  }
}
