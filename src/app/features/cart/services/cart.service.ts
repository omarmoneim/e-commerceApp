import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient=inject(HttpClient)
  private readonly cookieService=inject(CookieService)
  countNumber:BehaviorSubject<number> = new BehaviorSubject(0);






  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl + 'cart' ,
      {
            "productId": id
      },


    )

  }


  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(environment.baseUrl +'cart' )
  }


  removeOneItem(id:string):Observable<any>{
  return  this.httpClient.delete(environment.baseUrl +`cart/${id}`  )
  }

  updateCount(id:string,count:number):Observable<any>{
  return this.httpClient.put(environment.baseUrl+`cart/${id}` ,
    {
    "count":count
    },
)
}

checkoutSession(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `orders/checkout-session/${id}?url=${environment.paymentRedirectUrl}`,
      data
    );}


// checkoutSession(id:string|null,data:object):Observable<any>{
//  return this.httpClient.post(environment.baseUrl+`orders/checkout-session/${id}?url=http://localhost:4200`,
//     data
//   )
// }
checkoutCashSession(id:string|null ,data:object):Observable<any>{
 return this.httpClient.post(environment.baseUrl+`orders/${id}`,
  data  )
}



  getAllOrders(id:string|null):Observable<any>{
    return this.httpClient.get(environment.baseUrl+`orders/user/${id}`)
  }

}
