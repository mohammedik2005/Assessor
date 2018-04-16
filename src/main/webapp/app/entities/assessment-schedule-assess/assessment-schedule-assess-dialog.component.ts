import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AssessmentScheduleAssess } from './assessment-schedule-assess.model';
import { AssessmentScheduleAssessPopupService } from './assessment-schedule-assess-popup.service';
import { AssessmentScheduleAssessService } from './assessment-schedule-assess.service';
import { ComplianceScheduleAssess, ComplianceScheduleAssessService } from '../compliance-schedule-assess';

@Component({
    selector: 'jhi-assessment-schedule-assess-dialog',
    templateUrl: './assessment-schedule-assess-dialog.component.html'
})
export class AssessmentScheduleAssessDialogComponent implements OnInit {

    assessmentSchedule: AssessmentScheduleAssess;
    isSaving: boolean;

    complianceschedules: ComplianceScheduleAssess[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private assessmentScheduleService: AssessmentScheduleAssessService,
        private complianceScheduleService: ComplianceScheduleAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.complianceScheduleService.query()
            .subscribe((res: HttpResponse<ComplianceScheduleAssess[]>) => { this.complianceschedules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.assessmentSchedule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.assessmentScheduleService.update(this.assessmentSchedule));
        } else {
            this.subscribeToSaveResponse(
                this.assessmentScheduleService.create(this.assessmentSchedule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AssessmentScheduleAssess>>) {
        result.subscribe((res: HttpResponse<AssessmentScheduleAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AssessmentScheduleAssess) {
        this.eventManager.broadcast({ name: 'assessmentScheduleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackComplianceScheduleById(index: number, item: ComplianceScheduleAssess) {
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
    selector: 'jhi-assessment-schedule-assess-popup',
    template: ''
})
export class AssessmentScheduleAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assessmentSchedulePopupService: AssessmentScheduleAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.assessmentSchedulePopupService
                    .open(AssessmentScheduleAssessDialogComponent as Component, params['id']);
            } else {
                this.assessmentSchedulePopupService
                    .open(AssessmentScheduleAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
