import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DomainAssess } from './domain-assess.model';
import { DomainAssessPopupService } from './domain-assess-popup.service';
import { DomainAssessService } from './domain-assess.service';
import { AttachmentAssess, AttachmentAssessService } from '../attachment-assess';
import { PrinciplesAssess, PrinciplesAssessService } from '../principles-assess';
import { ControlAssess, ControlAssessService } from '../control-assess';

@Component({
    selector: 'jhi-domain-assess-dialog',
    templateUrl: './domain-assess-dialog.component.html'
})
export class DomainAssessDialogComponent implements OnInit {

    domain: DomainAssess;
    isSaving: boolean;

    attachments: AttachmentAssess[];

    principles: PrinciplesAssess[];

    controls: ControlAssess[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private domainService: DomainAssessService,
        private attachmentService: AttachmentAssessService,
        private principlesService: PrinciplesAssessService,
        private controlService: ControlAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.attachmentService.query()
            .subscribe((res: HttpResponse<AttachmentAssess[]>) => { this.attachments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.principlesService.query()
            .subscribe((res: HttpResponse<PrinciplesAssess[]>) => { this.principles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.controlService.query()
            .subscribe((res: HttpResponse<ControlAssess[]>) => { this.controls = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.domain.id !== undefined) {
            this.subscribeToSaveResponse(
                this.domainService.update(this.domain));
        } else {
            this.subscribeToSaveResponse(
                this.domainService.create(this.domain));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DomainAssess>>) {
        result.subscribe((res: HttpResponse<DomainAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DomainAssess) {
        this.eventManager.broadcast({ name: 'domainListModification', content: 'OK'});
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

    trackPrinciplesById(index: number, item: PrinciplesAssess) {
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
    selector: 'jhi-domain-assess-popup',
    template: ''
})
export class DomainAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private domainPopupService: DomainAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.domainPopupService
                    .open(DomainAssessDialogComponent as Component, params['id']);
            } else {
                this.domainPopupService
                    .open(DomainAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
