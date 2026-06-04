import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.interface';
import { RouterLink } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit{

  private readonly cartService =inject(CartService)
   private readonly toastr=inject( ToastrService)
  

  private readonly cookieService = inject(CookieService)


userCartData:Cart={} as Cart


ngOnInit(): void {
  this.getLoggedUserCart()
}

getLoggedUserCart():void{
  if(this.cookieService.get('token')){
     this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
     
        this.userCartData =res.data

    },

    error:(err)=>{
    }
  })

  }
 
}

removeItem(id:string):void{
  this.cartService.removeOneItem(id).subscribe({
    next:(res)=>{
        this.cartService.countNumber.next(res.numOfCartItems) ;
              this.userCartData =res.data
              this.toastr.warning("You Removed This Product From Cart","Fresh Cart")

    },
    error:(err)=>{


    }
  })
}

updateCounter(id:string,count:number):void{
  this.cartService.updateCount(id,count).subscribe({
    next:(res)=>{
      this.userCartData =res.data
        this.toastr.info( "Item Updated !!! " , "Fresh Cart")



    },
    error:(err)=>{

    }
  })
}

}
