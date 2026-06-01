import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient)
  private readonly cookieService = inject(CookieService)




  addProductToWishlist(id:string):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`wishlist`,
            {
            "productId": id

      },
    )
  }


  deleteProductFromWishlist(id:string):Observable<any>{
    return this.httpClient.delete(environment.baseUrl+`wishlist/${id}`
    )
  }

  getLoggedUserWishlist():Observable<any>{
    return this.httpClient.get(environment.baseUrl+`wishlist`
     )
  }
}
