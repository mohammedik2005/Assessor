import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ApplicantAssess } from './applicant-assess.model';
import { ApplicantAssessPopupService } from './applicant-assess-popup.service';
import { ApplicantAssessService } from './applicant-assess.service';
import { ComplianceValuesAssess, ComplianceValuesAssessService } from '../compliance-values-assess';

@Component({
    selector: 'jhi-applicant-assess-dialog',
    templateUrl: './applicant-assess-dialog.component.html'
})
export class ApplicantAssessDialogComponent implements OnInit {

    applicant: ApplicantAssess;
    isSaving: boolean;

    compliancevalues: ComplianceValuesAssess[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private applicantService: ApplicantAssessService,
        private complianceValuesService: ComplianceValuesAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.complianceValuesService.query()
            .subscribe((res: HttpResponse<ComplianceValuesAssess[]>) => { this.compliancevalues = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.applicant.id !== undefined) {
            this.subscribeToSaveResponse(
                this.applicantService.update(this.applicant));
        } else {
            this.subscribeToSaveResponse(
                this.applicantService.create(this.applicant));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ApplicantAssess>>) {
        result.subscribe((res: HttpResponse<ApplicantAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ApplicantAssess) {
        this.eventManager.broadcast({ name: 'applicantListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackComplianceValuesById(index: number, item: ComplianceValuesAssess) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-applicant-assess-popup',
    template: ''
})
export class ApplicantAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private applicantPopupService: ApplicantAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.applicantPopupService
                    .open(ApplicantAssessDialogComponent as Component, params['id']);
            } else {
                this.applicantPopupService
                    .open(ApplicantAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
