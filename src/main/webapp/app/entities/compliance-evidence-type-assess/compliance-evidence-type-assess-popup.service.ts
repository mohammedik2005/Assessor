import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ComplianceEvidenceTypeAssess } from './compliance-evidence-type-assess.model';
import { ComplianceEvidenceTypeAssessService } from './compliance-evidence-type-assess.service';

@Injectable()
export class ComplianceEvidenceTypeAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private complianceEvidenceTypeService: ComplianceEvidenceTypeAssessService

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
                this.complianceEvidenceTypeService.find(id)
                    .subscribe((complianceEvidenceTypeResponse: HttpResponse<ComplianceEvidenceTypeAssess>) => {
                        const complianceEvidenceType: ComplianceEvidenceTypeAssess = complianceEvidenceTypeResponse.body;
                        complianceEvidenceType.createdDate = this.datePipe
                            .transform(complianceEvidenceType.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        complianceEvidenceType.modifiedDate = this.datePipe
                            .transform(complianceEvidenceType.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.complianceEvidenceTypeModalRef(component, complianceEvidenceType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.complianceEvidenceTypeModalRef(component, new ComplianceEvidenceTypeAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    complianceEvidenceTypeModalRef(component: Component, complianceEvidenceType: ComplianceEvidenceTypeAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.complianceEvidenceType = complianceEvidenceType;
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
