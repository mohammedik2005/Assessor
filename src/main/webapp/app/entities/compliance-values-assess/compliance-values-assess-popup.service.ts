import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ComplianceValuesAssess } from './compliance-values-assess.model';
import { ComplianceValuesAssessService } from './compliance-values-assess.service';

@Injectable()
export class ComplianceValuesAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private complianceValuesService: ComplianceValuesAssessService

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
                this.complianceValuesService.find(id)
                    .subscribe((complianceValuesResponse: HttpResponse<ComplianceValuesAssess>) => {
                        const complianceValues: ComplianceValuesAssess = complianceValuesResponse.body;
                        complianceValues.createdDate = this.datePipe
                            .transform(complianceValues.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        complianceValues.modifiedDate = this.datePipe
                            .transform(complianceValues.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.complianceValuesModalRef(component, complianceValues);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.complianceValuesModalRef(component, new ComplianceValuesAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    complianceValuesModalRef(component: Component, complianceValues: ComplianceValuesAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.complianceValues = complianceValues;
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
