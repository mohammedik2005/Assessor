import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ComplianceAssess } from './compliance-assess.model';
import { ComplianceAssessPopupService } from './compliance-assess-popup.service';
import { ComplianceAssessService } from './compliance-assess.service';
import { ComplianceValuesAssess, ComplianceValuesAssessService } from '../compliance-values-assess';
import { ControlAssess, ControlAssessService } from '../control-assess';
import { ComplianceFlagAssess, ComplianceFlagAssessService } from '../compliance-flag-assess';

@Component({
    selector: 'jhi-compliance-assess-dialog',
    templateUrl: './compliance-assess-dialog.component.html'
})
export class ComplianceAssessDialogComponent implements OnInit {

    compliance: ComplianceAssess;
    isSaving: boolean;

    compliancevalues: ComplianceValuesAssess[];

    controls: ControlAssess[];

    complianceflags: ComplianceFlagAssess[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private complianceService: ComplianceAssessService,
        private complianceValuesService: ComplianceValuesAssessService,
        private controlService: ControlAssessService,
        private complianceFlagService: ComplianceFlagAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.complianceValuesService.query()
            .subscribe((res: HttpResponse<ComplianceValuesAssess[]>) => { this.compliancevalues = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.controlService.query()
            .subscribe((res: HttpResponse<ControlAssess[]>) => { this.controls = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.complianceFlagService.query()
            .subscribe((res: HttpResponse<ComplianceFlagAssess[]>) => { this.complianceflags = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.compliance.id !== undefined) {
            this.subscribeToSaveResponse(
                this.complianceService.update(this.compliance));
        } else {
            this.subscribeToSaveResponse(
                this.complianceService.create(this.compliance));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ComplianceAssess>>) {
        result.subscribe((res: HttpResponse<ComplianceAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ComplianceAssess) {
        this.eventManager.broadcast({ name: 'complianceListModification', content: 'OK'});
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

    trackControlById(index: number, item: ControlAssess) {
        return item.id;
    }

    trackComplianceFlagById(index: number, item: ComplianceFlagAssess) {
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
    selector: 'jhi-compliance-assess-popup',
    template: ''
})
export class ComplianceAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private compliancePopupService: ComplianceAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.compliancePopupService
                    .open(ComplianceAssessDialogComponent as Component, params['id']);
            } else {
                this.compliancePopupService
                    .open(ComplianceAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
