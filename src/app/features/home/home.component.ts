import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
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
  listOfProducts=signal<Products[]>([])
  page:number = 2
  listOfProductsCount = computed(()=>this.listOfProducts.length)
  constructor(){
    effect(()=>console.log(this.listOfProductsCount))
  }

  ngOnInit(): void {
    this.getListOfProducts(this.page)
  }

  getListOfProducts(page:number=2 ):void{
    this.productsService.getAllProducts(page).subscribe({
      next:(res)=>{
        this.listOfProducts.set(res.data)
      },
      error:(err)=>{

      }
    }
    )
  }

}
