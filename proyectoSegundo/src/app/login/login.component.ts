import {Component} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {IResponse, IUserLogin} from "../models/user.model";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  rememberMe: boolean = false;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    const savedCredentials = localStorage.getItem('rememberMe');
    if (savedCredentials) {
      const {email, password} = JSON.parse(savedCredentials);
      this.loginForm.patchValue({email, password});
      this.rememberMe = true;
    }
  }

  toggleRememberMe(): void {
    this.rememberMe = !this.rememberMe;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;

      this.apiService.login(email, password).subscribe(
        (response: IResponse) => {
          if (response.exito) {
            if (response.usuario && 'correo' in response.usuario && 'contraseña' in response.usuario) {
              const user: IUserLogin = response.usuario;
              if (this.rememberMe) {
                localStorage.setItem('rememberMe', JSON.stringify({email, password}));
              } else {
                localStorage.removeItem('rememberMe');
              }

              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['/dashboard']); // Puse esto de mientras, pero pon la ruta que quieras
            } else {
              this.errorMessage = 'Respuesta inválida del servidor.';
            }
          } else {
            this.errorMessage = 'Credenciales incorrectas. Intente de nuevo';
          }
        },
        (error) => {
          console.error('Error en la autenticación: ', error);
          this.errorMessage = 'Ocurrió un error al intentar iniciar sesión. Intente nuevamente.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }
}
