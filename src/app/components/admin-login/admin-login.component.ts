import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  template: `
    <div class="login-container">
      <div class="login-box">
        <h2>Connexion Admin</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input type="text" id="username" [(ngModel)]="username" name="username" required>
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" [(ngModel)]="password" name="password" required>
          </div>
          <button type="submit">Se connecter</button>
          <p *ngIf="error" class="error">{{ error }}</p>
          <p class="login-links">
            <a routerLink="/login">Connexion Client</a>
          </p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    .login-box {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 1rem;
    }
    button:hover {
      background-color: #45a049;
    }
    .error {
      color: red;
      margin-top: 1rem;
    }
    .login-links {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
    }
    .login-links a {
      color: #4CAF50;
      text-decoration: none;
    }
    .login-links a:hover {
      text-decoration: underline;
    }
  `]
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      // The AuthService will handle the redirection based on user role
      // No need to manually navigate here
    } else {
      this.error = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
  }
} 