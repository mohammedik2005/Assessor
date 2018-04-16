import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AttachmentAssess } from './attachment-assess.model';
import { AttachmentAssessService } from './attachment-assess.service';

@Injectable()
export class AttachmentAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private attachmentService: AttachmentAssessService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.attachmentService.find(id)
                    .subscribe((attachmentResponse: HttpResponse<AttachmentAssess>) => {
                        const attachment: AttachmentAssess = attachmentResponse.body;
                        attachment.createdDate = this.datePipe
                            .transform(attachment.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        attachment.modifiedDate = this.datePipe
                            .transform(attachment.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.attachmentModalRef(component, attachment);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.attachmentModalRef(component, new AttachmentAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    attachmentModalRef(component: Component, attachment: AttachmentAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.attachment = attachment;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
