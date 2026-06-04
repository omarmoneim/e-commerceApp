import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-main-section',
  imports: [CarouselModule],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css',
})
export class MainSectionComponent {


  mainSectionOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoHeight:false,
    pullDrag: false,
    dots: true,
    autoplayHoverPause:true,
    navSpeed: 500,
    autoplay:true,
    autoplayTimeout:2500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

}
