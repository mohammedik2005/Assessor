import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ComplianceFlagAssess } from './compliance-flag-assess.model';
import { ComplianceFlagAssessService } from './compliance-flag-assess.service';

@Injectable()
export class ComplianceFlagAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private complianceFlagService: ComplianceFlagAssessService

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
                this.complianceFlagService.find(id)
                    .subscribe((complianceFlagResponse: HttpResponse<ComplianceFlagAssess>) => {
                        const complianceFlag: ComplianceFlagAssess = complianceFlagResponse.body;
                        complianceFlag.createdDate = this.datePipe
                            .transform(complianceFlag.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        complianceFlag.modifiedDate = this.datePipe
                            .transform(complianceFlag.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.complianceFlagModalRef(component, complianceFlag);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.complianceFlagModalRef(component, new ComplianceFlagAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    complianceFlagModalRef(component: Component, complianceFlag: ComplianceFlagAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.complianceFlag = complianceFlag;
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
