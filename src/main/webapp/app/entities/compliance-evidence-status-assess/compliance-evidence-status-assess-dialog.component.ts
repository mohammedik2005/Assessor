import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceEvidenceStatusAssess } from './compliance-evidence-status-assess.model';
import { ComplianceEvidenceStatusAssessPopupService } from './compliance-evidence-status-assess-popup.service';
import { ComplianceEvidenceStatusAssessService } from './compliance-evidence-status-assess.service';

@Component({
    selector: 'jhi-compliance-evidence-status-assess-dialog',
    templateUrl: './compliance-evidence-status-assess-dialog.component.html'
})
export class ComplianceEvidenceStatusAssessDialogComponent implements OnInit {

    complianceEvidenceStatus: ComplianceEvidenceStatusAssess;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private complianceEvidenceStatusService: ComplianceEvidenceStatusAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.complianceEvidenceStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.complianceEvidenceStatusService.update(this.complianceEvidenceStatus));
        } else {
            this.subscribeToSaveResponse(
                this.complianceEvidenceStatusService.create(this.complianceEvidenceStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComplianceEvidenceStatusAssess>>) {
        result.subscribe((res: HttpResponse<ComplianceEvidenceStatusAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComplianceEvidenceStatusAssess) {
        this.eventManager.broadcast({ name: 'complianceEvidenceStatusListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-compliance-evidence-status-assess-popup',
    template: ''
})
export class ComplianceEvidenceStatusAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceEvidenceStatusPopupService: ComplianceEvidenceStatusAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.complianceEvidenceStatusPopupService
                    .open(ComplianceEvidenceStatusAssessDialogComponent as Component, params['id']);
            } else {
                this.complianceEvidenceStatusPopupService
                    .open(ComplianceEvidenceStatusAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
