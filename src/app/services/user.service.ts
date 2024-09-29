// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private nextId = 1;

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUser(id: number): Observable<User | undefined> {
    const user = this.users.find(u => u.id === id);
    return of(user);
  }

  addUser(user: Omit<User, 'id'>): Observable<User> {
    const newUser: User = { id: this.nextId++, ...user };
    this.users.push(newUser);
    return of(newUser);
  }

  updateUser(id: number, updatedUser: Omit<User, 'id'>): Observable<User | undefined> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.users[userIndex] = { id, ...updatedUser };
      return of(this.users[userIndex]);
    }
    return of(undefined);
  }

  deleteUser(id: number): Observable<boolean> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return of(true);
    }
    return of(false);
  }
}
