import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // Si l'utilisateur est déjà connecté, le rediriger vers sa page d'accueil
      if (this.authService.isAdmin()) {
        this.router.navigate(['/listesproduits']);
      } else {
        this.router.navigate(['/products']);
      }
      return false;
    }
    return true;
  }
} 