import { Allorders} from './models/allorders.interface';
import { CartService } from './../cart/services/cart.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-allorders',
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css',
})
export class AllordersComponent implements OnInit{
  private readonly cartService =inject(CartService)
  private readonly cookieService= inject(CookieService)
  private readonly id =inject(PLATFORM_ID)

  UserOrder:Allorders[]=[]



ngOnInit(): void {
this.getAllUserOrders()


}



getAllUserOrders(): void {
    this.cartService.getAllOrders(this.cookieService.get('userId')).subscribe({
      next: (res: Allorders[]) => {
        this.UserOrder = res;
      },
    });
  }




}
