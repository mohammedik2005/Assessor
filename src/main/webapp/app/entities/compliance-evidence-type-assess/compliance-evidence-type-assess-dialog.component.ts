import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceEvidenceTypeAssess } from './compliance-evidence-type-assess.model';
import { ComplianceEvidenceTypeAssessPopupService } from './compliance-evidence-type-assess-popup.service';
import { ComplianceEvidenceTypeAssessService } from './compliance-evidence-type-assess.service';

@Component({
    selector: 'jhi-compliance-evidence-type-assess-dialog',
    templateUrl: './compliance-evidence-type-assess-dialog.component.html'
})
export class ComplianceEvidenceTypeAssessDialogComponent implements OnInit {

    complianceEvidenceType: ComplianceEvidenceTypeAssess;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private complianceEvidenceTypeService: ComplianceEvidenceTypeAssessService,
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
        if (this.complianceEvidenceType.id !== undefined) {
            this.subscribeToSaveResponse(
                this.complianceEvidenceTypeService.update(this.complianceEvidenceType));
        } else {
            this.subscribeToSaveResponse(
                this.complianceEvidenceTypeService.create(this.complianceEvidenceType));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComplianceEvidenceTypeAssess>>) {
        result.subscribe((res: HttpResponse<ComplianceEvidenceTypeAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComplianceEvidenceTypeAssess) {
        this.eventManager.broadcast({ name: 'complianceEvidenceTypeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-compliance-evidence-type-assess-popup',
    template: ''
})
export class ComplianceEvidenceTypeAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceEvidenceTypePopupService: ComplianceEvidenceTypeAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.complianceEvidenceTypePopupService
                    .open(ComplianceEvidenceTypeAssessDialogComponent as Component, params['id']);
            } else {
                this.complianceEvidenceTypePopupService
                    .open(ComplianceEvidenceTypeAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
