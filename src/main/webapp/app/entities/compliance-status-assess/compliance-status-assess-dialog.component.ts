import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceStatusAssess } from './compliance-status-assess.model';
import { ComplianceStatusAssessPopupService } from './compliance-status-assess-popup.service';
import { ComplianceStatusAssessService } from './compliance-status-assess.service';

@Component({
    selector: 'jhi-compliance-status-assess-dialog',
    templateUrl: './compliance-status-assess-dialog.component.html'
})
export class ComplianceStatusAssessDialogComponent implements OnInit {

    complianceStatus: ComplianceStatusAssess;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private complianceStatusService: ComplianceStatusAssessService,
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
        if (this.complianceStatus.id !== undefined) {
            this.subscribeToSaveResponse(
                this.complianceStatusService.update(this.complianceStatus));
        } else {
            this.subscribeToSaveResponse(
                this.complianceStatusService.create(this.complianceStatus));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComplianceStatusAssess>>) {
        result.subscribe((res: HttpResponse<ComplianceStatusAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComplianceStatusAssess) {
        this.eventManager.broadcast({ name: 'complianceStatusListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-compliance-status-assess-popup',
    template: ''
})
export class ComplianceStatusAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceStatusPopupService: ComplianceStatusAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.complianceStatusPopupService
                    .open(ComplianceStatusAssessDialogComponent as Component, params['id']);
            } else {
                this.complianceStatusPopupService
                    .open(ComplianceStatusAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
