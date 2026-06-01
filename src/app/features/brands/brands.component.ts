import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brands } from '../../core/models/brands.interface';
import { PaginatorState, Paginator } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brands',
  imports: [ Paginator, FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService);
    popularBrands:Brands[]=[]
    first: number = 0;
    rows: number = 10;
    page:number = 1
    totalRecords!:number

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
        this.page =(event.page?? 0)+1;
        this.getAllBrands(this.page)
    }
  
  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(page:number=1):void{
    this.brandsService.getAllBrands(page).subscribe({
      next:(res)=>{
        console.log(res)
        this.popularBrands=res.data
        this.rows=res.metadata.limit
        this.totalRecords=res.results
      },
      error:(err)=>{
        console.log(err)
      }
    })     
}
}

