// src/app/components/user-create/user-create.component.ts
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  name: string = '';
  email: string = '';

  constructor(private userService: UserService, public router: Router) { } // Cambiado a public

  addUser(): void {
    if (this.name && this.email) {
      this.userService.addUser({ name: this.name, email: this.email }).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
