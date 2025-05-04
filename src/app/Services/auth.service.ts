import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'client';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    if (!this.isLoggedIn()) {
      this.handleUnauthorizedAccess();
    }
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  async login(username: string, password: string): Promise<boolean> {
    if (username === 'admin' && password === 'admin') {
      const user: User = { id: 1, username: 'admin', role: 'admin' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      this.router.navigate(['/listesproduits']);
      return true;
    }

    try {
      const users: any[] = await this.http.get<any[]>(`${this.apiUrl}/users`).toPromise();
      const client = users.find(u => u.username === username && u.password === password && u.role === 'client');

      if (client) {
        const user: User = { id: client.id, username: client.username, role: 'client' };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.router.navigate(['/products', { id: client.id }]);
        return true;
      } else {
        return false; // Mauvais identifiants
      }
    } catch (error) {
      console.error('Erreur lors de la requête login client', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.handleUnauthorizedAccess();
  }

  private handleUnauthorizedAccess() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/admin')) {
      this.router.navigate(['/admin/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  isClient(): boolean {
    return this.currentUserSubject.value?.role === 'client';
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  async registerClient(username: string, password: string): Promise<boolean> {
    try {
      const newClient = {
        username,
        password,
        role: 'client'
      };

      const response = await this.http.post(`${this.apiUrl}/users`, newClient).toPromise();
      console.log('Client enregistré avec succès:', response);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du client:', error);
      return false;
    }
  }

  isActivated(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser !== null;
  }
}
