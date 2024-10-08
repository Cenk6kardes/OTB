import { HttpParams, HttpContext, HttpHeaders } from '@angular/common/http';

export interface Options {
  params?: HttpParams;
  context?: HttpContext;
  headers?: HttpHeaders;
}
