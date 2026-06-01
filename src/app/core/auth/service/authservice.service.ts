import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { DecodeToken } from '../models/decode-token.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  private readonly httpClient=inject(HttpClient)
  private readonly cookieService=inject(CookieService)
  private readonly router=inject(Router)


  registerForm(bodyData:object):Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup' , bodyData)
  }
  loginForm(bodyData:object):Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin' , bodyData)
  }

  signOut(){
    this.cookieService.delete('token')
    this.router.navigate(['/home'])

  }

  decodeToken() {
    let decode:DecodeToken ={} as DecodeToken;
    try{
       decode= jwtDecode(this.cookieService.get('token'))
      }
    catch(error){
      this.signOut()
}
return decode;
  }

submitVerifyEmail(bodyData:object):Observable<any>{
  return this.httpClient.post(environment.baseUrl +`auth/forgotPasswords`,bodyData)
}
submitVerifyResetCode(bodyData:object):Observable<any>{
  return this.httpClient.post(environment.baseUrl +`auth/verifyResetCode`,bodyData)
}
submitVerifyResetPassword(bodyData:object):Observable<any>{
  return this.httpClient.put(environment.baseUrl +`auth/resetPassword`,bodyData)
}

}
