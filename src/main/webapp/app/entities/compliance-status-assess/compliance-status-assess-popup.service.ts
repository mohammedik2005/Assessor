import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ComplianceStatusAssess } from './compliance-status-assess.model';
import { ComplianceStatusAssessService } from './compliance-status-assess.service';

@Injectable()
export class ComplianceStatusAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private complianceStatusService: ComplianceStatusAssessService

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
                this.complianceStatusService.find(id)
                    .subscribe((complianceStatusResponse: HttpResponse<ComplianceStatusAssess>) => {
                        const complianceStatus: ComplianceStatusAssess = complianceStatusResponse.body;
                        complianceStatus.createdDate = this.datePipe
                            .transform(complianceStatus.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        complianceStatus.modifiedDate = this.datePipe
                            .transform(complianceStatus.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.complianceStatusModalRef(component, complianceStatus);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.complianceStatusModalRef(component, new ComplianceStatusAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    complianceStatusModalRef(component: Component, complianceStatus: ComplianceStatusAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.complianceStatus = complianceStatus;
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
