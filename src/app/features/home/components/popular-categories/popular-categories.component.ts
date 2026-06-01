import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Category } from '../../../../core/models/products.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit{
  private readonly categoriesService =inject(CategoriesService);
  categoryList:Category[]=[]





    categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplayHoverPause:true,
    navSpeed: 1000,
    autoplay:true,
    autoplayTimeout:2500,
    animateIn:true,
    items:1,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      380: {
        items: 3
      },
      450: {
        items: 4
      },
      740: {
        items: 5
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  ngOnInit(): void {
    this.getAllCategories()
  }
  getAllCategories():void{
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList=res.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
