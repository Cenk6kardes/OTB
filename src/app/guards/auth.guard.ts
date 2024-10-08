import { AuthenticationService } from './../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private authenticationservice: AuthenticationService,
    private router: Router
  ) {}
  canActivate() {
    if (this.authenticationservice.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['auth/signin']);
      return false;
    }
  }
}
