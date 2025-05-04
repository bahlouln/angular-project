import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return false;
        }

        // Check if route requires admin role
        if (route.data.requiresAdmin && user.role !== 'admin') {
          this.router.navigate(['/products']);
          return false;
        }

        // Check if route requires client role
        if (route.data.requiresClient && user.role !== 'client') {
          this.router.navigate(['/ajouterproduit']);
          return false;
        }

        return true;
      })
    );
  }
} 