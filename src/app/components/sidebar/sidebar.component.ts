import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  requiresAdmin?: boolean;
  requiresClient?: boolean;
}

export const ROUTES: RouteInfo[] = [
  { 
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'dashboard',
    class: '',
    requiresAdmin: true
  },
  { 
    path: '/ajouterproduit',
    title: 'Ajouter Produit',
    icon: 'add_shopping_cart',
    class: '',
    requiresAdmin: true
  },
  { 
    path: '/listesproduits',
    title: 'Liste des Produits',
    icon: 'list',
    class: '',
    requiresAdmin: true
  },
  
  // Client routes
  { 
    path: '/products',
    title: 'Products',
    icon: 'store',
    class: '',
    requiresClient: true
  },
  { 
    path: '/cart',
    title: 'Shopping Cart',
    icon: 'shopping_cart',
    class: '',
    requiresClient: true
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = [];
  userRole: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.userRole = user?.role || null;
      this.updateMenuItems();
    });
  }

  updateMenuItems() {
    if (this.userRole === 'admin') {
      this.menuItems = ROUTES.filter(route => route.requiresAdmin);
    } else if (this.userRole === 'client') {
      this.menuItems = ROUTES.filter(route => route.requiresClient);
    } else {
      this.menuItems = [];
    }
  }

  logout() {
    this.authService.logout();
  }

  isMobileMenu() {
    return window.innerWidth <= 991;
  }
}