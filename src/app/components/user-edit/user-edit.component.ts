// src/app/components/user-edit/user-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user?: User;
  name: string = '';
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public router: Router // Cambiado a public
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id).subscribe(user => {
      if (user) {
        this.user = user;
        this.name = user.name;
        this.email = user.email;
      } else {
        // Manejar usuario no encontrado
        this.router.navigate(['/']);
      }
    });
  }

  updateUser(): void {
    if (this.user && this.name && this.email) {
      this.userService.updateUser(this.user.id, { name: this.name, email: this.email }).subscribe(updated => {
        if (updated) {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
