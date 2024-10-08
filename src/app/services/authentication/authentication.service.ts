import { Injectable } from '@angular/core';

import { BaseApiService } from './../base-api/base-api.service';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { Md5 } from 'ts-md5';

import { BaseOptionsRequest } from './../../models/base-options-request.model';
import {
  ISignInCredentials,
  IToken,
  User,
  ISignUpResponse,
  ISignUpCredentials,
} from './../../models/authentication.model';
import { USER_INFO } from './../../models/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public user$: Observable<User>;
  private userSubject$$: BehaviorSubject<User>;
  private refreshTokenTimeout?: ReturnType<typeof setTimeout>;

  constructor(private readonly baseApiService: BaseApiService) {
    const localStorageUserInformation = localStorage.getItem(USER_INFO)
      ? JSON.parse(localStorage.getItem(USER_INFO) || '')
      : null;
    this.userSubject$$ = new BehaviorSubject<User>(localStorageUserInformation);
    this.user$ = this.userSubject$$.asObservable();
  }

  public get userValue(): User {
    return this.userSubject$$.value;
  }

  login(userCred: ISignInCredentials): Observable<User> {
    return this.baseApiService.save<User>('/Auth/login', userCred).pipe(
      map((user: User) => {
        user.gravatarImageUrl = this.createGravatarImageURL(user.userName);
        this.userSubject$$.next(user);
        this.startRefreshTokenTimer();
        localStorage.setItem(USER_INFO, JSON.stringify(user));

        return user;
      }),
    );
  }

  signUp(newUser: ISignUpCredentials): Observable<ISignUpResponse> {
    return this.baseApiService.save<ISignUpResponse>('/User', newUser);
  }

  getToken(): IToken['token']['acessToken'] {
    return this.userValue.token.acessToken;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(USER_INFO);
  }

  logout(): void {
    this.stopRefreshTokenTimer();
    this.userSubject$$.next({} as User);
    localStorage.removeItem(USER_INFO);
    location.reload(); // TODO: Directly re-route using Router from angular
  }

  refreshToken(): Observable<boolean> {
    const searchParams: BaseOptionsRequest = {
      ['RefreshToken']: this.userValue.token.refreshToken,
    };

    return this.baseApiService
      .get<IToken>('/Auth/RefreshToken', searchParams)
      .pipe(
        map((token: IToken) => {
          this.userValue.token = token.token;
          localStorage.setItem(USER_INFO, JSON.stringify(this.userValue));

          return true;
        })
      );
  }

  createGravatarImageURL(userName: string): string {
    const md5HashedEmail = Md5.hashStr(userName.toLowerCase() + '@orioninc.com');

    return `https://www.gravatar.com/avatar/${md5HashedEmail}?r=g&d=wavatar`;
  }

  private startRefreshTokenTimer(): void {
    const timeout =
      new Date(this.userValue.token.expirationDate).getTime() -
      Date.now() -
      60 * 1000;

    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken().subscribe(),
      timeout
    );
  }

  private stopRefreshTokenTimer(): void {
    clearTimeout(this.refreshTokenTimeout);
  }
}
