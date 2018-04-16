import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ComplianceEvidenceNoteAssess } from './compliance-evidence-note-assess.model';
import { ComplianceEvidenceNoteAssessService } from './compliance-evidence-note-assess.service';

@Injectable()
export class ComplianceEvidenceNoteAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private complianceEvidenceNoteService: ComplianceEvidenceNoteAssessService

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
                this.complianceEvidenceNoteService.find(id)
                    .subscribe((complianceEvidenceNoteResponse: HttpResponse<ComplianceEvidenceNoteAssess>) => {
                        const complianceEvidenceNote: ComplianceEvidenceNoteAssess = complianceEvidenceNoteResponse.body;
                        this.ngbModalRef = this.complianceEvidenceNoteModalRef(component, complianceEvidenceNote);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.complianceEvidenceNoteModalRef(component, new ComplianceEvidenceNoteAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    complianceEvidenceNoteModalRef(component: Component, complianceEvidenceNote: ComplianceEvidenceNoteAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.complianceEvidenceNote = complianceEvidenceNote;
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
