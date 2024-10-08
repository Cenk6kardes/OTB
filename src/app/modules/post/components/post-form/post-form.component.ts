import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, Toolbar, schema, Validators as NgxEditorValidators } from 'ngx-editor';

import { PostService } from '../../../../services/post/post.service';
import { CategoryService } from '../../../../modules/home/services/category/category.service';
import { ToastService } from '../../../../services/toaster/toast.service';
import { Observable } from 'rxjs';

import {
  IPostLevel,
  IPostStatus,
} from '../../../../models/post-level-status.model';
import { Item } from '../../../../models/item.model';
import { IPost } from '../../../../models/post.model';

@Component({
  selector: 'otb-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent implements OnInit, OnDestroy {
  @Input() formType = '';

  public postForm!: FormGroup;
  public postLevels!: Observable<IPostLevel[]>;
  public postStatuses!: Observable<IPostStatus[]>;
  public tags!: Observable<Item[]>;
  public categories!: Observable<Item[]>;
  public postType!: string;
  public editor!: Editor;
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  get customTitle() {
    return this.postForm.get('customTitle');
  }
  get title() {
    return this.postForm.get('title');
  }
  get summary() {
    return this.postForm.get('summary');
  }
  get content() {
    return this.postForm.get('content');
  }
  get postStatusId() {
    return this.postForm.get('postStatusId');
  }
  get postLevelId() {
    return this.postForm.get('postLevelId');
  }
  get categoriesArea() {
    return this.postForm.get('categories');
  }
  get url() {
    return this.postForm.get('url');
  }

  public readonly maxChars = {
    customTitle: 250,
    title: 2000,
    summary: 4000,
  };

  constructor(
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly toastr: ToastService,
    private readonly router: Router,
  ) {
    this.initForm();

    this.categories = this.categoryService.categories$;
    this.tags = this.postService.tags$;
    this.postLevels = this.postService.levels$;
    this.postStatuses = this.postService.statues$;
  }

  ngOnInit(): void {
    this.editor = new Editor({
      content: '',
      plugins: [],
      schema,
      nodeViews: {},
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
    });
    this.postService.singlePost.subscribe((postData: IPost) => {
      if (postData.url) {
        this.postType = 'external';
        this.content?.setValidators([]);
        this.content?.updateValueAndValidity();
      } else {
        this.postType = 'internal';
        this.customTitle?.setValidators([]);
        this.summary?.setValidators([]);

        this.customTitle?.updateValueAndValidity();
        this.summary?.updateValueAndValidity();
      }

      this.postForm.patchValue(postData);
    });
  }

  initForm(): void {
    this.postForm = new FormGroup({
      customTitle: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(this.maxChars.customTitle),
      ]),
      title: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(this.maxChars.title),
      ]),
      summary: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(this.maxChars.summary),
      ]),
      content: new FormControl<string>('', NgxEditorValidators.required(schema)),
      postStatusId: new FormControl<string | null>(null, Validators.required),
      postLevelId: new FormControl<string | null>('', Validators.required),
      tags: new FormControl<string[]>([]),
      categories: new FormControl<string[]>([], Validators.required),
      url: new FormControl<string | null>(''),
    });
  }

  submitForm(): void {
    this.postService.singlePost.next({
      ...this.postService.singlePost.value,
      customTitle:
        this.postType === 'internal'
          ? this.postForm.value.title
          : this.postForm.value.customTitle,
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      summary: this.postForm.value.summary,
      postStatusId: this.postForm.value.postStatusId,
      postLevelId: this.postForm.value.postLevelId,
      tags: this.postForm.value.tags,
      categories: this.postForm.value.categories,
      url: this.postForm.value.url,
    });

    if (this.postForm.valid && !this.postService.singlePost.value.id) {
      this.addPost();
    }

    if (this.postForm.valid && this.postService.singlePost.value.id) {
      this.editPost();
    }
  }

  addPost(): void {
    this.postService.createPost(this.postService.singlePost.value).subscribe({
      next: () => {
        this.toastr.success('Post created successfully', true);
        this.router.navigate(['']);
      },
    });
  }

  editPost(): void {
    this.postService.editPost(this.postService.singlePost.value).subscribe({
      next: () => {
        this.toastr.success('Post edited successfully', true);
        this.router.navigate(['']);
      },
    });
  }

  triggerContentValidators() {
    this.content?.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this.postService.singlePost.next({
      customTitle: '',
      title: '',
      content: '',
      summary: '',
      postStatusId: null,
      postLevelId: null,
      tags: [],
      categories: [],
    });
    this.editor.destroy();
  }
}
