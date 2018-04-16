import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ControlAssess } from './control-assess.model';
import { ControlAssessPopupService } from './control-assess-popup.service';
import { ControlAssessService } from './control-assess.service';
import { AttachmentAssess, AttachmentAssessService } from '../attachment-assess';
import { ControlPriorityAssess, ControlPriorityAssessService } from '../control-priority-assess';
import { ControlCategoryAssess, ControlCategoryAssessService } from '../control-category-assess';

@Component({
    selector: 'jhi-control-assess-dialog',
    templateUrl: './control-assess-dialog.component.html'
})
export class ControlAssessDialogComponent implements OnInit {

    control: ControlAssess;
    isSaving: boolean;

    attachments: AttachmentAssess[];

    controlpriorities: ControlPriorityAssess[];

    controlcategories: ControlCategoryAssess[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private controlService: ControlAssessService,
        private attachmentService: AttachmentAssessService,
        private controlPriorityService: ControlPriorityAssessService,
        private controlCategoryService: ControlCategoryAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.attachmentService.query()
            .subscribe((res: HttpResponse<AttachmentAssess[]>) => { this.attachments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.controlPriorityService.query()
            .subscribe((res: HttpResponse<ControlPriorityAssess[]>) => { this.controlpriorities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.controlCategoryService.query()
            .subscribe((res: HttpResponse<ControlCategoryAssess[]>) => { this.controlcategories = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.control.id !== undefined) {
            this.subscribeToSaveResponse(
                this.controlService.update(this.control));
        } else {
            this.subscribeToSaveResponse(
                this.controlService.create(this.control));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ControlAssess>>) {
        result.subscribe((res: HttpResponse<ControlAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ControlAssess) {
        this.eventManager.broadcast({ name: 'controlListModification', content: 'OK'});
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

    trackControlPriorityById(index: number, item: ControlPriorityAssess) {
        return item.id;
    }

    trackControlCategoryById(index: number, item: ControlCategoryAssess) {
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
    selector: 'jhi-control-assess-popup',
    template: ''
})
export class ControlAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private controlPopupService: ControlAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.controlPopupService
                    .open(ControlAssessDialogComponent as Component, params['id']);
            } else {
                this.controlPopupService
                    .open(ControlAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
