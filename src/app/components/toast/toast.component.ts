import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastService } from '../../services/toaster/toast.service';

import { Toast, ToastType } from '../../models/toastr.model';

@Component({
  selector: 'otb-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements OnInit {
  public toasts: Toast[] = [];

  constructor(
    private readonly toastService: ToastService,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.toastService.getAlert().subscribe((alert: Toast | null) => {
      if (!alert) {
        this.toasts = [];

        return;
      }
      this.toasts.push(alert);
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.toasts = this.toasts.filter((x) => x !== alert);
      }, 4000);
    });
  }

  removeToast(toast: Toast): void {
    this.toasts = this.toasts.filter((x) => x !== toast);
  }

  cssClass(toast: Toast): string {
    if (!toast) return '';

    switch (toast.type) {
      case ToastType.Success:
        return 'toast-success';
      case ToastType.Error:
        return 'toast-error';
      case ToastType.Info:
        return 'toast-info';
      case ToastType.Warning:
        return 'toast-warning';
    }
  }
}
