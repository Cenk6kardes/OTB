import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { BACKEND_API_URL } from '../../models/constants';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  public loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loadingMap: Map<string, boolean> = new Map<string, boolean>();
  // TODO: Use seperate functions for setting/unsetting the loading spinner
  setLoading(loading: boolean, url: string): void {
    if (!url) {
      throw new Error(
        'The request URL must be provided to the LoadingService.setLoading function'
      );
    }

    if (loading === true && url.includes(BACKEND_API_URL)) {
      this.loadingMap.set(url, loading);
      this.loadingSub.next(true);
    } else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }

    if (this.loadingMap.size === 0) {
      this.loadingSub.next(false);
    }
  }
}
