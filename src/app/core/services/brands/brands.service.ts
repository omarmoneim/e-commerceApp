import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly httpClint=inject(HttpClient)

  getAllBrands(page:number=1):Observable<any>{
    return this.httpClint.get(environment.baseUrl +`brands?page=${page}`)
  }

}
