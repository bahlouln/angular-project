import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
   <div class="login-container">
  <div class="login-box">
    <h2>Connexion</h2>
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" [(ngModel)]="username" name="username" required>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" [(ngModel)]="password" name="password" required>
      </div>
      <div class="form-group">
        <label for="role">Rôle</label>
        <select id="role" [(ngModel)]="role" name="role" required>
          <option value="client">Client</option>
          <option value="admin">Administrateur</option>
        </select>
      </div>
      <button type="submit">Se connecter</button>
      <p *ngIf="error" class="error">{{ error }}</p>
    </form>
    <p class="register-link">
      Vous n'avez pas de compte ?
      <a routerLink="/register">S'inscrire</a>
    </p>
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
    input, select {
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
  `]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = 'client';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    const success = await this.authService.login(this.username, this.password);
    if (!success) {
      this.error = 'Nom d\'utilisateur ou mot de passe incorrect';
    }
  }
}
