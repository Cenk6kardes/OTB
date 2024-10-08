import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../../../services/authentication/authentication.service';
import { Subject, takeUntil } from 'rxjs';

import { IDENTIFIER } from './../../../../models/constants';

@Component({
  selector: 'otb-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnDestroy {
  private destroy$$ = new Subject<void>();

  public showPassword = false;
  public useridentifier = localStorage.getItem(IDENTIFIER);

  public loginForm: FormGroup = new FormGroup({
    identifier: new FormControl<string>('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}'),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rememberMe: new FormControl(false),
  });

  get identifier() {
    return this.loginForm.get('identifier');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['']);
    }

    if (this.useridentifier) {
      this.loginForm.patchValue({
        identifier: this.useridentifier,
      });
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authenticationService
        .login({
          userNameOrEmail: this.identifier?.value + '@orioninc.com',
          password: this.password?.value,
        })
        .pipe(takeUntil(this.destroy$$))
        .subscribe({
          next: () => {
            if (this.rememberMe?.value) {
              localStorage.setItem(IDENTIFIER, this.identifier?.value);
            } else localStorage.removeItem(IDENTIFIER);
            this.router.navigate(['']);
          },
          error: (error) => {
            alert(error.error.Message);
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  showPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }

  forgotPassword(): void {
    if (this.identifier?.valid) {
      //
    } else {
      this.identifier?.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
