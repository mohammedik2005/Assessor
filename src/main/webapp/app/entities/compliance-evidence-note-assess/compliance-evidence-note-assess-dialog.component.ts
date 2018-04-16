import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { ComplianceEvidenceNoteAssess } from './compliance-evidence-note-assess.model';
import { ComplianceEvidenceNoteAssessPopupService } from './compliance-evidence-note-assess-popup.service';
import { ComplianceEvidenceNoteAssessService } from './compliance-evidence-note-assess.service';
import { ComplianceValuesAssess, ComplianceValuesAssessService } from '../compliance-values-assess';

@Component({
    selector: 'jhi-compliance-evidence-note-assess-dialog',
    templateUrl: './compliance-evidence-note-assess-dialog.component.html'
})
export class ComplianceEvidenceNoteAssessDialogComponent implements OnInit {

    complianceEvidenceNote: ComplianceEvidenceNoteAssess;
    isSaving: boolean;

    compliancevalues: ComplianceValuesAssess[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private complianceEvidenceNoteService: ComplianceEvidenceNoteAssessService,
        private complianceValuesService: ComplianceValuesAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.complianceValuesService.query()
            .subscribe((res: HttpResponse<ComplianceValuesAssess[]>) => { this.compliancevalues = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.complianceEvidenceNote.id !== undefined) {
            this.subscribeToSaveResponse(
                this.complianceEvidenceNoteService.update(this.complianceEvidenceNote));
        } else {
            this.subscribeToSaveResponse(
                this.complianceEvidenceNoteService.create(this.complianceEvidenceNote));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComplianceEvidenceNoteAssess>>) {
        result.subscribe((res: HttpResponse<ComplianceEvidenceNoteAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComplianceEvidenceNoteAssess) {
        this.eventManager.broadcast({ name: 'complianceEvidenceNoteListModification', content: 'OK'});
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
    selector: 'jhi-compliance-evidence-note-assess-popup',
    template: ''
})
export class ComplianceEvidenceNoteAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceEvidenceNotePopupService: ComplianceEvidenceNoteAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.complianceEvidenceNotePopupService
                    .open(ComplianceEvidenceNoteAssessDialogComponent as Component, params['id']);
            } else {
                this.complianceEvidenceNotePopupService
                    .open(ComplianceEvidenceNoteAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
