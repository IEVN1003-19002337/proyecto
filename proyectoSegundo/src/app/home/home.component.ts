import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { ApiDesignComponent } from "../api-design/api-design.component";
import { AbcManagementComponent } from "../abc-management/abc-management.component";
import { AdminUsersComponent } from "../admin-users/admin-users.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, ApiDesignComponent, AbcManagementComponent, AdminUsersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
