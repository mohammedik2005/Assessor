import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComplianceScheduleAssess } from './compliance-schedule-assess.model';
import { ComplianceScheduleAssessPopupService } from './compliance-schedule-assess-popup.service';
import { ComplianceScheduleAssessService } from './compliance-schedule-assess.service';
import { AssessmentScheduleAssess, AssessmentScheduleAssessService } from '../assessment-schedule-assess';

@Component({
    selector: 'jhi-compliance-schedule-assess-dialog',
    templateUrl: './compliance-schedule-assess-dialog.component.html'
})
export class ComplianceScheduleAssessDialogComponent implements OnInit {

    complianceSchedule: ComplianceScheduleAssess;
    isSaving: boolean;

    assessmentschedules: AssessmentScheduleAssess[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private complianceScheduleService: ComplianceScheduleAssessService,
        private assessmentScheduleService: AssessmentScheduleAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.assessmentScheduleService.query()
            .subscribe((res: HttpResponse<AssessmentScheduleAssess[]>) => { this.assessmentschedules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.complianceSchedule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.complianceScheduleService.update(this.complianceSchedule));
        } else {
            this.subscribeToSaveResponse(
                this.complianceScheduleService.create(this.complianceSchedule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComplianceScheduleAssess>>) {
        result.subscribe((res: HttpResponse<ComplianceScheduleAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComplianceScheduleAssess) {
        this.eventManager.broadcast({ name: 'complianceScheduleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAssessmentScheduleById(index: number, item: AssessmentScheduleAssess) {
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
    selector: 'jhi-compliance-schedule-assess-popup',
    template: ''
})
export class ComplianceScheduleAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceSchedulePopupService: ComplianceScheduleAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.complianceSchedulePopupService
                    .open(ComplianceScheduleAssessDialogComponent as Component, params['id']);
            } else {
                this.complianceSchedulePopupService
                    .open(ComplianceScheduleAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
