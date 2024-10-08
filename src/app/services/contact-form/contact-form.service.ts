import { Injectable } from '@angular/core';

import { BaseApiService } from '../../services/base-api/base-api.service';
import { Observable, map } from 'rxjs';

import { IContactRequest } from '../../models/contact-form.model';
import { GenericResponse } from '../../models/generic-response.model';
import { Item } from '../../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  constructor(private readonly baseApiService: BaseApiService) {}

  getContactReason(): Observable<Item[]> {
    return this.baseApiService
      .get<GenericResponse<Item[]>>('/ContactRequestReason')
      .pipe(
        map((response: GenericResponse<Item[]>) => {
          return response.value;
        }),
      );
  }

  postContactRequest(item: IContactRequest): Observable<boolean> {
    return this.baseApiService
      .save<IContactRequest>('/ContactRequest', item)
      .pipe(
        map(() => {
          return true;
        }),
      );
  }
}
