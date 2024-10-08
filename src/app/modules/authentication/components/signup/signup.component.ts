import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from './../../../../services/authentication/authentication.service';
import { Subject, takeUntil } from 'rxjs';

import Validation from './../../../../utils/validators';
import { ISignUpCredentials } from './../../../../models/authentication.model';
import { IDENTIFIER } from './../../../../models/constants';

@Component({
  selector: 'otb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  private destroy$$ = new Subject<void>();
  public registerForm!: FormGroup;

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get form() {
    return this.registerForm.errors;
  }

  constructor(
    private fb: FormBuilder,
    private readonly authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (this.authenticationService.isLoggedIn()) this.router.navigate(['']);

    this.registerForm = this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
  }

  onSubmit(): void {
    if (!this.registerForm.valid) return;

    const newUser: ISignUpCredentials = {
      userName: this.email?.value,
      email: `${this.email?.value}@orioninc.com`,
      password: this.password?.value,
      passwordConfirm: this.confirmPassword?.value,
    };

    this.authenticationService
      .signUp(newUser)
      .pipe(takeUntil(this.destroy$$))
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            localStorage.setItem(IDENTIFIER, newUser.userName);
            this.authenticationService
              .login({
                userNameOrEmail: newUser.userName,
                password: newUser.password,
              })
              .pipe(takeUntil(this.destroy$$))
              .subscribe({
                next: () => {
                  this.router.navigate(['']);
                },
                error: (error) => {
                  alert(error.error.Message);
                },
              });
          }
        },
        error: (error) => {
          alert(error.error.Message);
        },
      });
  }
}
