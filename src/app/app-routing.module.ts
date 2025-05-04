import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './carts/carts.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableListComponent } from './table-list/table-list.component';
import { ProduitsssComponent } from './administrateur/produitsss/produitsss.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: '/dashboard', component: DashboardComponent },
  { path: 'products', component: AllProductsComponent },
  { path: 'ajouterproduit', component: ArticleFormComponent },
  { path: 'details/:id', component: ProductsDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'listesproduits', component: TableListComponent },
  { path: 'admin', component: ProduitsssComponent }, 
  { path: ':id/edit', pathMatch: 'full', component: ArticleFormComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'register', component: RegisterClientComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/accueil' } // Redirection vers accueil pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
