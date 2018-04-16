import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AttachmentAssess } from './attachment-assess.model';
import { AttachmentAssessPopupService } from './attachment-assess-popup.service';
import { AttachmentAssessService } from './attachment-assess.service';

@Component({
    selector: 'jhi-attachment-assess-delete-dialog',
    templateUrl: './attachment-assess-delete-dialog.component.html'
})
export class AttachmentAssessDeleteDialogComponent {

    attachment: AttachmentAssess;

    constructor(
        private attachmentService: AttachmentAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.attachmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'attachmentListModification',
                content: 'Deleted an attachment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-attachment-assess-delete-popup',
    template: ''
})
export class AttachmentAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attachmentPopupService: AttachmentAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.attachmentPopupService
                .open(AttachmentAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
