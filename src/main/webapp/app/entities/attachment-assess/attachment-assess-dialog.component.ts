import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AttachmentAssess } from './attachment-assess.model';
import { AttachmentAssessPopupService } from './attachment-assess-popup.service';
import { AttachmentAssessService } from './attachment-assess.service';
import { DomainAssess, DomainAssessService } from '../domain-assess';
import { ComplianceValuesAssess, ComplianceValuesAssessService } from '../compliance-values-assess';
import { ControlAssess, ControlAssessService } from '../control-assess';

@Component({
    selector: 'jhi-attachment-assess-dialog',
    templateUrl: './attachment-assess-dialog.component.html'
})
export class AttachmentAssessDialogComponent implements OnInit {

    attachment: AttachmentAssess;
    isSaving: boolean;

    domains: DomainAssess[];

    compliancevalues: ComplianceValuesAssess[];

    controls: ControlAssess[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private attachmentService: AttachmentAssessService,
        private domainService: DomainAssessService,
        private complianceValuesService: ComplianceValuesAssessService,
        private controlService: ControlAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.domainService.query()
            .subscribe((res: HttpResponse<DomainAssess[]>) => { this.domains = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.complianceValuesService.query()
            .subscribe((res: HttpResponse<ComplianceValuesAssess[]>) => { this.compliancevalues = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.controlService.query()
            .subscribe((res: HttpResponse<ControlAssess[]>) => { this.controls = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.attachment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.attachmentService.update(this.attachment));
        } else {
            this.subscribeToSaveResponse(
                this.attachmentService.create(this.attachment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AttachmentAssess>>) {
        result.subscribe((res: HttpResponse<AttachmentAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AttachmentAssess) {
        this.eventManager.broadcast({ name: 'attachmentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDomainById(index: number, item: DomainAssess) {
        return item.id;
    }

    trackComplianceValuesById(index: number, item: ComplianceValuesAssess) {
        return item.id;
    }

    trackControlById(index: number, item: ControlAssess) {
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
    selector: 'jhi-attachment-assess-popup',
    template: ''
})
export class AttachmentAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private attachmentPopupService: AttachmentAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.attachmentPopupService
                    .open(AttachmentAssessDialogComponent as Component, params['id']);
            } else {
                this.attachmentPopupService
                    .open(AttachmentAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
