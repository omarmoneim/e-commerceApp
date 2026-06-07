import { Component, computed, effect, inject,  OnInit, signal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../core/models/products.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-products',
  imports: [CardComponent,PaginatorModule,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit  {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  isSignal:boolean=false
  listOfProducts =signal<Products[]>([])
  productList:Products[]=[]
  listOfProductsCount = computed(()=>this.listOfProducts.length)
  constructor(){
    effect(()=>console.log(this.listOfProductsCount))
  }
  searchText:string=''


  first: number = 0;
  rows: number = 10;
  page:number = 1
  totalRecords!:number

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
        this.page =(event.page?? 0)+1
        this.getListOfProducts(this.page)
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const id = params.get('id');

    if (id) {
      this.getProductsByCategory(id);
    } else {
      this.getListOfProducts();
    }
  });


  }


  getListOfProducts(page:number = 1):void{
    this.productsService.getAllProducts(page).subscribe({
      next:(res)=>{
                this.isSignal=true
        this.listOfProducts.set(res.data)
        this.rows=res.metadata.limit
        this.totalRecords=res.results
      },
      error:(err)=>{
      }
    }
    )
  }

    getProductsByCategory(categoryId: string): void {
    this.productsService.getProductsByCategory(categoryId).subscribe({
      next: (res) => {
                this.isSignal=false

        console.log(res)
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }




}
