import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';

import { Toast, ToastType } from '../../models/toastr.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public subject = new Subject<Toast | null>();
  public keepAfterRouteChange = true;

  constructor(public router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<Toast | null> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false): void {
    this.showNotification(ToastType.Success, message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false): void {
    this.showNotification(ToastType.Error, message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false): void {
    this.showNotification(ToastType.Info, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false): void {
    this.showNotification(ToastType.Warning, message, keepAfterRouteChange);
  }

  showNotification(type: ToastType, message: string, keepAfterRouteChange = false): void {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Toast>{ type: type, message: message });
  }

  clear(): void {
    this.subject.next(null);
  }
}
