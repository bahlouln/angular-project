import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ProductComponent } from './product/product.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/header/header.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SelectComponent } from './shared/select/select.component';
import { CartComponent } from './carts/carts.component';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ProduitsssComponent } from './administrateur/produitsss/produitsss.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NgChartsModule } from 'ng2-charts';
import { RegisterClientComponent } from './register-client/register-client.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgChartsModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    AdminLayoutModule
  ],
  declarations: [
    AppComponent,
    CartComponent,
    AdminLayoutComponent,
    AllProductsComponent,
    ProductComponent,
    ProductsDetailsComponent,
    HeaderComponent,
    SelectComponent,
    SpinnerComponent,
    ArticleFormComponent,
    ProduitsssComponent,
    ConfirmDialogComponent,
    AdminLoginComponent,
    AccueilComponent,
    RegisterClientComponent,
    LoginComponent   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
