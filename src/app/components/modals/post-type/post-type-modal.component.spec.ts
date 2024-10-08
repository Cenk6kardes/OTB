import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTypeModalComponent } from './post-type-modal.component';

describe('PostTypeModalComponent', () => {
  let component: PostTypeModalComponent;
  let fixture: ComponentFixture<PostTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTypeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
