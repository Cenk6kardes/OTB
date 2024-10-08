import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule} from '@angular/common';

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';

import { PostTypeModalComponent } from '../modals/post-type/post-type-modal.component';

@Component({
  selector: 'otb-create-new-post-button',
  standalone: true,
  imports: [CommonModule, MdbTooltipModule],
  templateUrl: './create-new-post-button.component.html',
  styleUrls: ['./create-new-post-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewPostButtonComponent {
  public modalRef!: MdbModalRef<PostTypeModalComponent>;

  constructor(private readonly modalService: MdbModalService) {}

  openModal() {
    this.modalRef = this.modalService.open(PostTypeModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        title: 'Post Type',
      },
    });
  }
}
