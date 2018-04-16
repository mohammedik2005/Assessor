import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ControlPriorityAssess } from './control-priority-assess.model';
import { ControlPriorityAssessPopupService } from './control-priority-assess-popup.service';
import { ControlPriorityAssessService } from './control-priority-assess.service';

@Component({
    selector: 'jhi-control-priority-assess-dialog',
    templateUrl: './control-priority-assess-dialog.component.html'
})
export class ControlPriorityAssessDialogComponent implements OnInit {

    controlPriority: ControlPriorityAssess;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private controlPriorityService: ControlPriorityAssessService,
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
        if (this.controlPriority.id !== undefined) {
            this.subscribeToSaveResponse(
                this.controlPriorityService.update(this.controlPriority));
        } else {
            this.subscribeToSaveResponse(
                this.controlPriorityService.create(this.controlPriority));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ControlPriorityAssess>>) {
        result.subscribe((res: HttpResponse<ControlPriorityAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ControlPriorityAssess) {
        this.eventManager.broadcast({ name: 'controlPriorityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-control-priority-assess-popup',
    template: ''
})
export class ControlPriorityAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private controlPriorityPopupService: ControlPriorityAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.controlPriorityPopupService
                    .open(ControlPriorityAssessDialogComponent as Component, params['id']);
            } else {
                this.controlPriorityPopupService
                    .open(ControlPriorityAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
