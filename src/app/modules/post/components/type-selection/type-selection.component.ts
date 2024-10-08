import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { PostService } from '../../../../services/post/post.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'otb-type-selection',
  templateUrl: './type-selection.component.html',
  styleUrls: ['./type-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypeSelectionComponent implements OnInit, OnDestroy {
  public type = false;
  public form!: FormGroup;
  public reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  public formSub$: Subscription | undefined;
  public title: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly postService: PostService,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.formSub$ = this.form
      .get('postType')?.valueChanges.subscribe((value) => {
        if (value === 'internal') {
          this.form.get('externalUrl')?.setValidators([]);
          this.form.get('externalUrl')?.patchValue('');
        } else {
          this.form
            .get('externalUrl')
            ?.setValidators([
              Validators.required,
              Validators.pattern(this.reg),
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

            this.router.navigate(['../', 'new'], {
              relativeTo: this.route,
            });
          },
        });
      } else {
        this.router.navigate(['../', 'new'], { relativeTo: this.route });
      }
    }
  }

  ngOnDestroy(): void {
    this.formSub$?.unsubscribe();
  }
}
