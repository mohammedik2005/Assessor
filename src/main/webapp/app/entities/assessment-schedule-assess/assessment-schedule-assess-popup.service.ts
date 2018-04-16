import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AssessmentScheduleAssess } from './assessment-schedule-assess.model';
import { AssessmentScheduleAssessService } from './assessment-schedule-assess.service';

@Injectable()
export class AssessmentScheduleAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private assessmentScheduleService: AssessmentScheduleAssessService

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
                this.assessmentScheduleService.find(id)
                    .subscribe((assessmentScheduleResponse: HttpResponse<AssessmentScheduleAssess>) => {
                        const assessmentSchedule: AssessmentScheduleAssess = assessmentScheduleResponse.body;
                        assessmentSchedule.fromDate = this.datePipe
                            .transform(assessmentSchedule.fromDate, 'yyyy-MM-ddTHH:mm:ss');
                        assessmentSchedule.toDate = this.datePipe
                            .transform(assessmentSchedule.toDate, 'yyyy-MM-ddTHH:mm:ss');
                        assessmentSchedule.createdDate = this.datePipe
                            .transform(assessmentSchedule.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        assessmentSchedule.modifiedDate = this.datePipe
                            .transform(assessmentSchedule.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.assessmentScheduleModalRef(component, assessmentSchedule);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.assessmentScheduleModalRef(component, new AssessmentScheduleAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    assessmentScheduleModalRef(component: Component, assessmentSchedule: AssessmentScheduleAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.assessmentSchedule = assessmentSchedule;
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
