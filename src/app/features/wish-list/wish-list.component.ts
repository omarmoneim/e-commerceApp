import { ToastrService } from 'ngx-toastr';
import { Wishlist } from './models/wishlist.interface';
import { WishlistService } from './services/wishlist.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnInit{
  private readonly wishlistService =inject(WishlistService)
  private readonly toast=inject( ToastrService)
  userWishlist:Wishlist[]=[]


ngOnInit(): void {
  this.getLoggedUserWishlist()
}
  getLoggedUserWishlist():void{
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.userWishlist = res.data

      },
      error:(err)=>{

      }
    })
  }

  removeItemFromWishList(id:string):void{
    this.wishlistService.deleteProductFromWishlist(id).subscribe({
      next:(res)=>{
          this.toast.warning("You Removed This Product From WishList","Fresh Cart")
        this.userWishlist=res.data



      },
      error:(err)=>{


      }
    })
  }

}
