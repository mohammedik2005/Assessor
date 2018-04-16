import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceFlagAssess } from './compliance-flag-assess.model';
import { ComplianceFlagAssessPopupService } from './compliance-flag-assess-popup.service';
import { ComplianceFlagAssessService } from './compliance-flag-assess.service';

@Component({
    selector: 'jhi-compliance-flag-assess-dialog',
    templateUrl: './compliance-flag-assess-dialog.component.html'
})
export class ComplianceFlagAssessDialogComponent implements OnInit {

    complianceFlag: ComplianceFlagAssess;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private complianceFlagService: ComplianceFlagAssessService,
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
        if (this.complianceFlag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.complianceFlagService.update(this.complianceFlag));
        } else {
            this.subscribeToSaveResponse(
                this.complianceFlagService.create(this.complianceFlag));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComplianceFlagAssess>>) {
        result.subscribe((res: HttpResponse<ComplianceFlagAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComplianceFlagAssess) {
        this.eventManager.broadcast({ name: 'complianceFlagListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-compliance-flag-assess-popup',
    template: ''
})
export class ComplianceFlagAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceFlagPopupService: ComplianceFlagAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.complianceFlagPopupService
                    .open(ComplianceFlagAssessDialogComponent as Component, params['id']);
            } else {
                this.complianceFlagPopupService
                    .open(ComplianceFlagAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
