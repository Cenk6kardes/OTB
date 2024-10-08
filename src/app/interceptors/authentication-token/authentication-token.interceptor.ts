import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { BACKEND_API_URL } from 'src/app/models/constants';

@Injectable()
export class AuthenticationTokenInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isLogged = this.authenticationService.isLoggedIn();
    const user = this.authenticationService.userValue;
    const isApiUrl = request.url.startsWith(BACKEND_API_URL);

    if (isLogged && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${user?.token.acessToken}` },
      });
    }

    return next.handle(request);
  }
}
