import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPostButtonComponent } from './create-new-post-button.component';

describe('SectionComponent', () => {
  let component: CreateNewPostButtonComponent;
  let fixture: ComponentFixture<CreateNewPostButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CreateNewPostButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewPostButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
