import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComplianceValuesAssess } from './compliance-values-assess.model';
import { ComplianceValuesAssessPopupService } from './compliance-values-assess-popup.service';
import { ComplianceValuesAssessService } from './compliance-values-assess.service';
import { AttachmentAssess, AttachmentAssessService } from '../attachment-assess';
import { ComplianceStatusAssess, ComplianceStatusAssessService } from '../compliance-status-assess';
import { ComplianceScheduleAssess, ComplianceScheduleAssessService } from '../compliance-schedule-assess';
import { ComplianceEvidenceTypeAssess, ComplianceEvidenceTypeAssessService } from '../compliance-evidence-type-assess';
import { ComplianceEvidenceStatusAssess, ComplianceEvidenceStatusAssessService } from '../compliance-evidence-status-assess';
import { ApplicantAssess, ApplicantAssessService } from '../applicant-assess';
import { ComplianceAssess, ComplianceAssessService } from '../compliance-assess';
import { ComplianceEvidenceNoteAssess, ComplianceEvidenceNoteAssessService } from '../compliance-evidence-note-assess';

@Component({
    selector: 'jhi-compliance-values-assess-dialog',
    templateUrl: './compliance-values-assess-dialog.component.html'
})
export class ComplianceValuesAssessDialogComponent implements OnInit {

    complianceValues: ComplianceValuesAssess;
    isSaving: boolean;

    attachments: AttachmentAssess[];

    compliancestatuses: ComplianceStatusAssess[];

    complianceschedules: ComplianceScheduleAssess[];

    complianceevidencetypes: ComplianceEvidenceTypeAssess[];

    complianceevidencestatuses: ComplianceEvidenceStatusAssess[];

    applicants: ApplicantAssess[];

    compliances: ComplianceAssess[];

    complianceevidencenotes: ComplianceEvidenceNoteAssess[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private complianceValuesService: ComplianceValuesAssessService,
        private attachmentService: AttachmentAssessService,
        private complianceStatusService: ComplianceStatusAssessService,
        private complianceScheduleService: ComplianceScheduleAssessService,
        private complianceEvidenceTypeService: ComplianceEvidenceTypeAssessService,
        private complianceEvidenceStatusService: ComplianceEvidenceStatusAssessService,
        private applicantService: ApplicantAssessService,
        private complianceService: ComplianceAssessService,
        private complianceEvidenceNoteService: ComplianceEvidenceNoteAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.attachmentService.query()
            .subscribe((res: HttpResponse<AttachmentAssess[]>) => { this.attachments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.complianceStatusService.query()
            .subscribe((res: HttpResponse<ComplianceStatusAssess[]>) => { this.compliancestatuses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.complianceScheduleService.query()
            .subscribe((res: HttpResponse<ComplianceScheduleAssess[]>) => { this.complianceschedules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.complianceEvidenceTypeService.query()
            .subscribe((res: HttpResponse<ComplianceEvidenceTypeAssess[]>) => { this.complianceevidencetypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.complianceEvidenceStatusService.query()
            .subscribe((res: HttpResponse<ComplianceEvidenceStatusAssess[]>) => { this.complianceevidencestatuses = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.applicantService.query()
            .subscribe((res: HttpResponse<ApplicantAssess[]>) => { this.applicants = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.complianceService.query()
            .subscribe((res: HttpResponse<ComplianceAssess[]>) => { this.compliances = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.complianceEvidenceNoteService.query()
            .subscribe((res: HttpResponse<ComplianceEvidenceNoteAssess[]>) => { this.complianceevidencenotes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.complianceValues.id !== undefined) {
            this.subscribeToSaveResponse(
                this.complianceValuesService.update(this.complianceValues));
        } else {
            this.subscribeToSaveResponse(
                this.complianceValuesService.create(this.complianceValues));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComplianceValuesAssess>>) {
        result.subscribe((res: HttpResponse<ComplianceValuesAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComplianceValuesAssess) {
        this.eventManager.broadcast({ name: 'complianceValuesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAttachmentById(index: number, item: AttachmentAssess) {
        return item.id;
    }

    trackComplianceStatusById(index: number, item: ComplianceStatusAssess) {
        return item.id;
    }

    trackComplianceScheduleById(index: number, item: ComplianceScheduleAssess) {
        return item.id;
    }

    trackComplianceEvidenceTypeById(index: number, item: ComplianceEvidenceTypeAssess) {
        return item.id;
    }

    trackComplianceEvidenceStatusById(index: number, item: ComplianceEvidenceStatusAssess) {
        return item.id;
    }

    trackApplicantById(index: number, item: ApplicantAssess) {
        return item.id;
    }

    trackComplianceById(index: number, item: ComplianceAssess) {
        return item.id;
    }

    trackComplianceEvidenceNoteById(index: number, item: ComplianceEvidenceNoteAssess) {
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
    selector: 'jhi-compliance-values-assess-popup',
    template: ''
})
export class ComplianceValuesAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceValuesPopupService: ComplianceValuesAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.complianceValuesPopupService
                    .open(ComplianceValuesAssessDialogComponent as Component, params['id']);
            } else {
                this.complianceValuesPopupService
                    .open(ComplianceValuesAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
