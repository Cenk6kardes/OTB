import { inject, DestroyRef } from '@angular/core';

import { Observable, Observer } from 'rxjs';
// This will be available in Angular v16
export function subscribeInComponent<T>(
  obs$: Observable<T>,
  observerOrNext: Partial<Observer<T>> | ((value: T) => void)
) {
  const subscription = obs$.subscribe(observerOrNext);

  inject(DestroyRef).onDestroy(() => subscription.unsubscribe());

  return subscription;
}
