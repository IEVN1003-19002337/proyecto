import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, LoginComponent, RegisterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrige 'styleUrl' a 'styleUrls'
})
export class AppComponent {
  title = 'proyectoSegundo';
}