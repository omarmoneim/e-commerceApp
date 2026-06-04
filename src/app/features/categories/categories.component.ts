import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../core/models/categories.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService)
    categories:Categories[]=[]
    listOfProducts :any

     ngOnInit(): void {
      this.getAllCategories();
     }
 
     getAllCategories():void{
      this.categoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categories=res.data


        }
      })
     }

  



}
