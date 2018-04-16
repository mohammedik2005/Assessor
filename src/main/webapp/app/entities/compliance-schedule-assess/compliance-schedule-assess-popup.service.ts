import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ComplianceScheduleAssess } from './compliance-schedule-assess.model';
import { ComplianceScheduleAssessService } from './compliance-schedule-assess.service';

@Injectable()
export class ComplianceScheduleAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private complianceScheduleService: ComplianceScheduleAssessService

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
                this.complianceScheduleService.find(id)
                    .subscribe((complianceScheduleResponse: HttpResponse<ComplianceScheduleAssess>) => {
                        const complianceSchedule: ComplianceScheduleAssess = complianceScheduleResponse.body;
                        complianceSchedule.createdDate = this.datePipe
                            .transform(complianceSchedule.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        complianceSchedule.modifiedDate = this.datePipe
                            .transform(complianceSchedule.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.complianceScheduleModalRef(component, complianceSchedule);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.complianceScheduleModalRef(component, new ComplianceScheduleAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    complianceScheduleModalRef(component: Component, complianceSchedule: ComplianceScheduleAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.complianceSchedule = complianceSchedule;
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
