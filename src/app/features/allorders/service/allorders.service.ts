import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { DecodeToken } from '../../../core/auth/models/decode-token.interface';
@Injectable({
  providedIn: 'root',
})
export class AllordersService {

}
