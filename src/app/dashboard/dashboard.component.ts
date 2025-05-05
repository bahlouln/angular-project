import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'app/services/products.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import * as Chartist from 'chartist';
// Si tu utilises chart.js
// import { ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  NbProduits: number = 0;
  Nbfemme: number = 0;
  Nbhomme: number = 0;
  NbEnfant: number = 0;
  ProdName: string[] = [];
  chartOptions: ChartOptions = {};
  chartLabelsline: string[] = ["enfant", "homme", "femme"];
  chartDatapie: any[] = [
    { 
      label: '',
      data: []
    }
  ];
  chartDatabar: ChartDataset[] = [
    {
      label: 'Nombre de produits par intervalle de prix',
      data: [] // sera rempli dynamiquement
    }
  ];
  
  chartLabelsbar: string[] = ["0-50 DT", "51-100 DT", "101-200 DT", "201+ DT"];  
  chartLabelspie: string[] = ["enfant", "homme", "femme"];

  constructor(private PS: ProductsService) {}

  ngOnInit(): void {
    this.PS.getProducts().subscribe((res) => {
      this.NbProduits = res.length;

      for (let i = 0; i < res.length; i++) {
        const category = res[i].category;
        this.ProdName.push(res[i].category);

        if (category === "enfant") this.NbEnfant++;
        else if (category === "femme") this.Nbfemme++;
        else if (category === "homme") this.Nbhomme++;
      }

      this.chartDatapie = [
        {
          data: [this.NbEnfant, this.Nbhomme, this.Nbfemme]
        }
      ];
      this.chartLabelsline = this.ProdName;
    });
    this.PS.getProducts().subscribe((products) => {
      const counts = [0, 0, 0, 0]; // correspond aux 4 intervalles
  
      for (let product of products) {
        const price = product.price;
  
        if (price <= 50) counts[0]++;
        else if (price <= 100) counts[1]++;
        else if (price <= 200) counts[2]++;
        else counts[3]++;
      }
  
      // Mise à jour des données du graphique
      this.chartDatabar = [{
        label: 'Nombre de produits par intervalle de prix',
        data: counts,
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336']
      }];
    });
  
  }
}
