import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PrinciplesAssess } from './principles-assess.model';
import { PrinciplesAssessService } from './principles-assess.service';

@Injectable()
export class PrinciplesAssessPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private principlesService: PrinciplesAssessService

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
                this.principlesService.find(id)
                    .subscribe((principlesResponse: HttpResponse<PrinciplesAssess>) => {
                        const principles: PrinciplesAssess = principlesResponse.body;
                        principles.createdDate = this.datePipe
                            .transform(principles.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        principles.modifiedDate = this.datePipe
                            .transform(principles.modifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.principlesModalRef(component, principles);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.principlesModalRef(component, new PrinciplesAssess());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    principlesModalRef(component: Component, principles: PrinciplesAssess): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.principles = principles;
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
