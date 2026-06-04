import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const toastrService = inject(ToastrService)

  return next(req).pipe( catchError( (err)=>{
          if (err.status !== 401) {
                toastrService.error(err.error.message)
                 }

    return throwError(()=>err)
  }));
};
