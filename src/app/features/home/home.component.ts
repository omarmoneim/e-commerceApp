import { Component, inject, OnInit } from '@angular/core';
import { PopularProductsComponent } from "./components/popular-products/popular-products.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { MainSectionComponent } from "./components/main-section/main-section.component";
import { CardComponent } from "../../shared/components/card/card.component";
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../core/models/products.interface';
import { PopularBrandsComponent } from "./components/popular-brands/popular-brands.component";


@Component({
  selector: 'app-home',
  imports: [PopularProductsComponent, PopularCategoriesComponent, MainSectionComponent, CardComponent, PopularBrandsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  listOfProducts :Products[]=[]
  page:number = 2

  ngOnInit(): void {
    this.getListOfProducts(this.page)
  }

  getListOfProducts(page:number=2 ):void{
    this.productsService.getAllProducts(page).subscribe({
      next:(res)=>{
        this.listOfProducts=res.data
      },
      error:(err)=>{

      }
    }
    )
  }

}
