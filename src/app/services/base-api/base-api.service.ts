import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, pipe, UnaryFunction } from 'rxjs';

import { BACKEND_API_URL } from 'src/app/models/constants';
import { BaseOptionsRequest } from '../../models/base-options-request.model';
import { Options } from '../../models/options.model';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private _baseApiUrl: string;

  constructor(private readonly httpClient: HttpClient) {
    this._baseApiUrl = BACKEND_API_URL;
  }

  public get<T>(
    endpointUrl: string,
    searchParams?: BaseOptionsRequest,
    headers?: HttpHeaders,
  ): Observable<T> {
    const options = this.getOptions(searchParams, headers);

    return this.httpClient.get<T>(`${this._baseApiUrl}${endpointUrl}`, options);
  }

  public save<T>(
    endPointUrl: string,
    requestBody: unknown,
    headers?: HttpHeaders,
    searchParams?: BaseOptionsRequest,
  ): Observable<T> {
    const options = this.getOptions(searchParams, headers);

    return this.httpClient.post<T>(`${this._baseApiUrl}${endPointUrl}`, requestBody, options);
  }

  public update<T>(
    endPointUrl: string,
    requestBody: unknown,
    searchParams?: BaseOptionsRequest,
  ): Observable<T> {
    const options = this.getOptions(searchParams);

    return this.httpClient.put<T>(`${this._baseApiUrl}${endPointUrl}`, requestBody, options);
  }

  public remove<T>(
    endPointUrl: string,
    searchParams?: BaseOptionsRequest,
  ): Observable<T> {
    const options = this.getOptions(searchParams);

    return this.httpClient.delete<T>(`${this._baseApiUrl}${endPointUrl}`, options);
  }

  private getOptions(searchParams?: Options, httpHeaders?: HttpHeaders) {
    const options: Options = {};
    const params = searchParams ? this.getSearchParams(searchParams) : null;
    const headers = httpHeaders ? httpHeaders : null;

    if (params) {
      options.params = params;
    }

    if (headers) {
      options.headers = headers;
    }

    return options;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getSearchParams(searchParams: any): HttpParams {
    let params = new HttpParams();

    for (const prop in searchParams) {
      if (![undefined, '', null].includes(searchParams[prop])) {
        params = params.set(prop, searchParams[prop].toString());
      }
    }

    return params;
  }

  /* private applyOptions(args: { useTimeout?: boolean, useSomething?: boolean}) {
    const operators: UnaryFunction<unknown, unknown>[] = [];
    operators.push();
    operators.push();

    return pipe.apply(this , operators);
  } */
}
