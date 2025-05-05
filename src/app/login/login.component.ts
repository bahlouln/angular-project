import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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