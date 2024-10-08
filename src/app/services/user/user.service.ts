import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { BaseApiService } from '../base-api/base-api.service';

import { UserProfile } from '../../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly baseApiService: BaseApiService) {}

  getUserById(userId: string): Observable<UserProfile> {
    return this.baseApiService.get<UserProfile>(`/User/${userId}`).pipe(
      map((user: UserProfile) => {
        const name: string[] = user.userName.split('.');

        return {
          ...user,
          displayName: name.join(' '),
        };
      })
    );
  }
}
