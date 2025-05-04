import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import * as Chartist from 'chartist';
import { ProductsService } from 'Services/products.service';
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
      data: []
    }
  ];
  chartLabelspie: string[] = ["enfant", "homme", "femme"];

  constructor(private PS: ProductsService) {}

  ngOnInit(): void {
    this.PS.GetAllProductss().subscribe((res) => {
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
  }
}
