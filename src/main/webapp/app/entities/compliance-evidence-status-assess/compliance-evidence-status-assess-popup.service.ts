import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ComplianceEvidenceStatusAssess } from './compliance-evidence-status-assess.model';
import { ComplianceEvidenceStatusAssessService } from './compliance-evidence-status-assess.service';

@Injectable()
export class ComplianceEvidenceStatusAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private complianceEvidenceStatusService: ComplianceEvidenceStatusAssessService

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
                this.complianceEvidenceStatusService.find(id)
                    .subscribe((complianceEvidenceStatusResponse: HttpResponse<ComplianceEvidenceStatusAssess>) => {
                        const complianceEvidenceStatus: ComplianceEvidenceStatusAssess = complianceEvidenceStatusResponse.body;
                        complianceEvidenceStatus.createdDate = this.datePipe
                            .transform(complianceEvidenceStatus.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        complianceEvidenceStatus.modifiedDate = this.datePipe
                            .transform(complianceEvidenceStatus.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.complianceEvidenceStatusModalRef(component, complianceEvidenceStatus);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.complianceEvidenceStatusModalRef(component, new ComplianceEvidenceStatusAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    complianceEvidenceStatusModalRef(component: Component, complianceEvidenceStatus: ComplianceEvidenceStatusAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.complianceEvidenceStatus = complianceEvidenceStatus;
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
