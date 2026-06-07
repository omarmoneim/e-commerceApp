import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { ProductsService } from '../../../../core/services/products/products.service';
import { Products } from '../../../../core/models/products.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../wish-list/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-popular-products',
  imports: [Carousel, ButtonModule, Tag, RouterLink],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
   private readonly productsService = inject(ProductsService);
   private readonly cartService =inject(CartService)
   private readonly wishlistService =inject(WishlistService)
      private readonly toast=inject( ToastrService)


  productsList=signal<Products[]>([]);

    productsListCount = computed(()=>this. productsList.length)
  constructor(){
    effect(()=>console.log(this. productsListCount))
  }

  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
  this.getProducts();
   this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 5,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 4,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '640px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '420px',
                numVisible: 1,
                numScroll: 1
            }
        ]
  }

getProducts():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
       this.productsList.set(res.data)
    },
  })
}


addToCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
      this.cartService.countNumber.next(res.numOfCartItems) ;
       if(res.status === "success"){
        this.toast.success(res.message,"Fresh Cart")
      }

    },
    error:(err)=>{

                      this.toast.error("Failed Request","Fresh Cart")



    }
  })

}

addMyProductTowishlist(id:string):void{
  this.wishlistService.addProductToWishlist(id).subscribe({
    next:(res)=>{
      if(res.status ==="success"){
        this.toast.success(res.message)

      }

    },
    error:(err)=>{
              this.toast.error("Failed Request","Fresh Cart")



    }
  })
}
getSeverity(status: string): any {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

}
