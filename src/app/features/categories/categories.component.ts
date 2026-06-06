import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../core/models/categories.interface';
import { Router } from "@angular/router";


@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService)
  private readonly router = inject(Router)
  categories:Categories[]=[]


     ngOnInit(): void {
      this.getAllCategories();
     }
 
     getAllCategories():void{
      this.categoriesService.getAllCategories().subscribe({
        next:(res)=>{
          this.categories=res.data


        },
        error:(err)=>{
        }     
      })
     }

    goToCategory(id: string): void {
    this.router.navigate(['/products', id]);
  }


}
