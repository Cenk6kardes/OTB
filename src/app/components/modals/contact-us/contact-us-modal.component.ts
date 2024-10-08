import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MdbModule } from '../../../modules/mdb.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ContactFormService } from '../../../services/contact-form/contact-form.service';
import { ToastService } from '../../../services/toaster/toast.service';
import { retry, take } from 'rxjs';

import { IContactRequest } from '../../../models/contact-form.model';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'otb-contact-us-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MdbModule, NgSelectModule],
  templateUrl: './contact-us-modal.component.html',
  styleUrls: ['./contact-us-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsModalComponent implements OnInit {
  public title = '';
  public contactForm!: FormGroup;
  public item!: IContactRequest;
  public reasonArray!: Item[];
  public selectedOption: string | null = null;
  public relatedPostId = '';

  get reasonId() {
    return this.contactForm.get('reasonId');
  }
  get detail() {
    return this.contactForm.get('detail');
  }

  constructor(
    public readonly modalRef: MdbModalRef<ContactUsModalComponent>,
    private readonly contactService: ContactFormService,
    private readonly toast: ToastService,
    private readonly cdRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.contactService
      .getContactReason()
      .pipe(take(1), retry(2))
      .subscribe((res) => {
        this.reasonArray = res;
        this.cdRef.markForCheck();
      });

    if (this.relatedPostId !== null) {
      this.selectedOption = 'f7f9d9d5-695d-4f50-8b41-714a46dfd615';
    }

    this.createForm();
  }

  onSubmit(): void {
    this.contactService
      .postContactRequest(this.contactForm.value)
      .pipe(take(1), retry(2))
      .subscribe({
        next: () => {
          this.toast.success('Your request has been saved, successfully!');
        },
        complete: () => this.modalRef.close(),
      });
  }

  private createForm(): void {
    this.contactForm = new FormGroup({
      reasonId: new FormControl<string | null>(
        this.selectedOption,
        Validators.required
      ),
      relatedPostId: new FormControl(this.relatedPostId),
      detail: new FormControl<string>('', Validators.required),
    });
  }
}
