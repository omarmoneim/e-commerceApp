import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../../../core/services/brands/brands.service';
import { Brands } from '../../../../core/models/brands.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-popular-brands',
  imports: [CarouselModule],
  templateUrl: './popular-brands.component.html',
  styleUrl: './popular-brands.component.css',
})
export class PopularBrandsComponent implements OnInit {
  private readonly brandsService =inject(BrandsService)
  popularBrands:Brands[]=[]



    brandsOptions: OwlOptions = {
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
    margin:8,
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
    nav: false
  }

  ngOnInit(): void {
    this.getBrands()
  }

getBrands():void{
  this.brandsService.getAllBrands().subscribe({
    next:(res)=>{
      this.popularBrands=res.data

    },
    error:(err)=>{
      console.log(err);

    }
  })
}

}
