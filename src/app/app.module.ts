import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MdbModule } from './modules/mdb.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreModule } from './modules/core.module';

import { ErrorHandleInterceptor } from './interceptors/error-handle/error-handle.interceptor';
import { AuthenticationTokenInterceptor } from './interceptors/authentication-token/authentication-token.interceptor';
import { LoadingSpinnerInterceptor } from './interceptors/loading-spinner/loading-spinner.interceptor';

import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ToastComponent } from './components/toast/toast.component';
import { ContactUsModalComponent } from './components/modals/contact-us/contact-us-modal.component';
import { PostTypeModalComponent } from './components/modals/post-type/post-type-modal.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    MdbModule,
    NgSelectModule,
    AppRoutingModule,
    LoadingComponent,
    ToastComponent,
    ContactUsModalComponent,
    PostTypeModalComponent,
  ],
  providers: [
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingSpinnerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandleInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
