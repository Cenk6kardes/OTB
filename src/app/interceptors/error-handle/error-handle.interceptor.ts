import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ToastService } from '../../services/toaster/toast.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly toast: ToastService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isLogged = this.authenticationService.isLoggedIn();

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if (error.error instanceof ErrorEvent) {
          // Client side Error
          errorMsg = `Error: ${error.error.message}`;
        } else {
          //Server side Error
          errorMsg = `Error Code: ${error.status}, Message: ${
            error.error.Message || error.message
          }`;

          if (
            (error.status === HttpStatusCode.Unauthorized ||
              error.status === HttpStatusCode.Forbidden) &&
            isLogged
          ) {
            this.authenticationService.logout();
          }
        }

        this.toast.error(errorMsg);

        return throwError(() => new Error(errorMsg));
      })
    );
  }
}
