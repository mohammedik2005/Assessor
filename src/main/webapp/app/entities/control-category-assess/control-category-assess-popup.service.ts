import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ControlCategoryAssess } from './control-category-assess.model';
import { ControlCategoryAssessService } from './control-category-assess.service';

@Injectable()
export class ControlCategoryAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private controlCategoryService: ControlCategoryAssessService

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
                this.controlCategoryService.find(id)
                    .subscribe((controlCategoryResponse: HttpResponse<ControlCategoryAssess>) => {
                        const controlCategory: ControlCategoryAssess = controlCategoryResponse.body;
                        controlCategory.createdDate = this.datePipe
                            .transform(controlCategory.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        controlCategory.modifiedDate = this.datePipe
                            .transform(controlCategory.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.controlCategoryModalRef(component, controlCategory);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.controlCategoryModalRef(component, new ControlCategoryAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    controlCategoryModalRef(component: Component, controlCategory: ControlCategoryAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.controlCategory = controlCategory;
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
