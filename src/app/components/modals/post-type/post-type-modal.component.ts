import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModule } from '../../../../app/modules/mdb.module';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PostService } from '../../../services/post/post.service';
import { SlugifyPipe } from '../../../../app/pipes/slugify/slugify.pipe';

import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdbModule,
    MdbFormsModule,
    SlugifyPipe,
  ],
  providers: [SlugifyPipe],
  selector: 'otb-post-type-modal',
  templateUrl: './post-type-modal.component.html',
  styleUrls: ['./post-type-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostTypeModalComponent implements OnInit, OnDestroy {
  public title = '';
  public urlRegex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/;
  public form!: FormGroup;
  private form$$!: Subscription | undefined;

  constructor(
    public readonly modalRef: MdbModalRef<PostTypeModalComponent>,
    private readonly router: Router,
    private readonly postService: PostService,
    private readonly slugify: SlugifyPipe,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.form$$ = this.form
      .get('postType')
      ?.valueChanges.subscribe((value) => {
        if (value === 'internal') {
          this.form.get('externalUrl')?.setValidators([]);
          this.form.get('externalUrl')?.patchValue('');
        } else {
          this.form
            .get('externalUrl')
            ?.setValidators([
              Validators.required,
              Validators.pattern(this.urlRegex),
            ]);
        }

        this.form.get('externalUrl')?.updateValueAndValidity();
      });
  }

  initForm(): void {
    this.form = new FormGroup({
      postType: new FormControl<string>('internal', Validators.required),
      externalUrl: new FormControl<string>(''),
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      if (this.form.value.postType === 'external') {
        this.postService.getFromUrl(this.form.value.externalUrl).subscribe({
          next: (response) => {
            this.postService.singlePost.next({
              ...this.postService.singlePost.value,
              title: response.title,
              summary: response.summary,
              url: this.form.value.externalUrl,
            });

            this.modalRef.close();
            this.router.navigate(['/' + this.slugify.transform(-1) + '/post']);
          },
        });
      } else {
        this.modalRef.close();
        this.router.navigate(['/' + this.slugify.transform(-1) + '/post']);
      }
    }
  }

  ngOnDestroy(): void {
    this.form$$?.unsubscribe();
  }
}
