import { Component, inject,  OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Products } from '../../core/models/products.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-products',
  imports: [CardComponent,PaginatorModule,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit  {
  private readonly productsService = inject(ProductsService);
  listOfProducts :Products[]=[]

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
    this.getListOfProducts();


  }


  getListOfProducts(page:number = 1):void{
    this.productsService.getAllProducts(page).subscribe({
      next:(res)=>{
        this.listOfProducts=res.data
        this.rows=res.metadata.limit
        this.totalRecords=res.results



      },
      error:(err)=>{

      }
    }
    )
  }




}
