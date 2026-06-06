import { Component, inject, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { Products } from '../../../core/models/products.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wish-list/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-card',
   imports: [CardModule, ButtonModule, Tag, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',

})
export class CardComponent  {


  private readonly cartService = inject(CartService)
  private readonly toast=inject( ToastrService)
  private readonly wishlistService =inject(WishlistService)



  @Input({required:true}) product:Products={} as Products
addProductsToCart(id:string):void{
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


}
