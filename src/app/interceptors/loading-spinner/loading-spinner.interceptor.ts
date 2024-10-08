import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';

import { LoadingSpinnerService } from '../../services/loading-spinner/loading-spinner.service';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingSpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.setLoading(true, request.url);

    return (
      next
        .handle(request)
        .pipe(
          catchError((err) => {
            setTimeout(() => {
              this.loadingService.setLoading(false, request.url);
            }, 2000);

            return err;
          }),
        )
        .pipe(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          map<any, any>((evt: HttpEvent<any>) => {
            if (evt instanceof HttpResponse) {
              this.loadingService.setLoading(false, request.url);
            }

            return evt;
          }),
        )
    );
  }
}
