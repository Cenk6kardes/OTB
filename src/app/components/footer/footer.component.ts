import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ContactUsModalComponent } from '../modals/contact-us/contact-us-modal.component';

import { PageService } from '../../services/page/page.service';

@Component({
  selector: 'otb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public modalRef!: MdbModalRef<ContactUsModalComponent>;

  constructor(
    public readonly pageService: PageService,
    private readonly modalService: MdbModalService,
  ) {}

  openModal(): void {
    this.modalRef = this.modalService.open(ContactUsModalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        title: 'Report An Issue',
        relatedPostId: null,
      },
    });
  }
}
