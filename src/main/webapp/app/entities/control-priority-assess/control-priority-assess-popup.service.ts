import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ControlPriorityAssess } from './control-priority-assess.model';
import { ControlPriorityAssessService } from './control-priority-assess.service';

@Injectable()
export class ControlPriorityAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private controlPriorityService: ControlPriorityAssessService

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
                this.controlPriorityService.find(id)
                    .subscribe((controlPriorityResponse: HttpResponse<ControlPriorityAssess>) => {
                        const controlPriority: ControlPriorityAssess = controlPriorityResponse.body;
                        controlPriority.createdDate = this.datePipe
                            .transform(controlPriority.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        controlPriority.modifiedDate = this.datePipe
                            .transform(controlPriority.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.controlPriorityModalRef(component, controlPriority);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.controlPriorityModalRef(component, new ControlPriorityAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    controlPriorityModalRef(component: Component, controlPriority: ControlPriorityAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.controlPriority = controlPriority;
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
