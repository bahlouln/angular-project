import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/Modeles/products';
import { ProductsService } from 'app/services/products.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.css']
})
export class ArticleFormComponent implements OnInit {

  form: FormGroup;
  idCourant: string = '';              // string, pas number
  categories: string[] = ["enfant", "homme", "femme"];
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private PS: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // 1) On récupère l'id tel quel (string)
    const idParam = this.activatedRoute.snapshot.params['id'] as string | undefined;
    this.idCourant = idParam ?? '';
    this.isEditMode = this.idCourant !== '';

    // 2) Si mode édition, on patch le formulaire
    if (this.isEditMode) {
      this.PS.getProductById(this.idCourant).subscribe(product => {
        this.form.patchValue({
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image
        });
      });
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    // 3) Prépare l'objet Product (id: string | undefined)
    const productData: Product = {
      ...this.form.value,
      id: this.isEditMode ? this.idCourant : undefined,
      isFavorite: false
    };

    // 4) Appel au service
    if (this.isEditMode) {
      this.PS.updateProduct(this.idCourant, productData).subscribe(() => {
        this.router.navigate(['/listesproduits']);
      });
    } else {
      this.PS.addProduct(productData).subscribe(() => {
        this.router.navigate(['/listesproduits']);
      });
    }
  }

}
