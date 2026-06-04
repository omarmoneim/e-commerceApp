import { AuthserviceService } from './../../../core/auth/service/authservice.service';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, HostListener, inject, Inject, Input, PLATFORM_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CartService } from '../../../features/cart/services/cart.service';
import { WishlistService } from '../../../features/wish-list/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, RouterLink,FormsModule,RouterLinkActive,AvatarModule,OverlayBadgeModule,FormsModule],
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  sidebarOpen = false;
  private readonly isBrowser: boolean;
  private readonly cookieService=inject(CookieService)
  private readonly authserviceService= inject(AuthserviceService)
  private readonly cartService= inject(CartService)
  private readonly wishListService= inject(WishlistService)
  private readonly id = inject(PLATFORM_ID)

  cartCount!:number ;

  constructor(
    private readonly eRef: ElementRef,
    @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.getCartNumber()
    if(isPlatformBrowser(this.id)){
      this.getAllNumberOfCarts()
    }
    }



  getCartNumber():void{
     this.cartService.countNumber.subscribe({
      next:(value)=>{
        this.cartCount = value
      }
     })
  }
  getAllNumberOfCarts():void{

this.cartService.getLoggedUserCart().subscribe({
  next:(res)=>{
    this.cartService.countNumber.next(res.numOfCartItems)
  }

})





  }



  
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  closeSidebar() {
    this.sidebarOpen = false;
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!this.isBrowser) return;
    const clickedInside = this.eRef.nativeElement.contains(event.target);
    if (!clickedInside && this.sidebarOpen) {
      this.sidebarOpen = false;
    }
  }


@Input({required:true}) isLogin!:boolean

checkCookie():boolean{
  if( this.cookieService.get('token')){

    return true
  }
  else{
    return false
  }
}

signOutClicked(){
  this.authserviceService.signOut()
}

// checkRoute():boolean{
//   if(this.router.url ==='/products'){
//     return true
//   }
//   else{
//     return false
//   }
}













