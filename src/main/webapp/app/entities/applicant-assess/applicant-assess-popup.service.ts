import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ApplicantAssess } from './applicant-assess.model';
import { ApplicantAssessService } from './applicant-assess.service';

@Injectable()
export class ApplicantAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private applicantService: ApplicantAssessService

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
                this.applicantService.find(id)
                    .subscribe((applicantResponse: HttpResponse<ApplicantAssess>) => {
                        const applicant: ApplicantAssess = applicantResponse.body;
                        applicant.createdDate = this.datePipe
                            .transform(applicant.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        applicant.modifiedDate = this.datePipe
                            .transform(applicant.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.applicantModalRef(component, applicant);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.applicantModalRef(component, new ApplicantAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    applicantModalRef(component: Component, applicant: ApplicantAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.applicant = applicant;
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
