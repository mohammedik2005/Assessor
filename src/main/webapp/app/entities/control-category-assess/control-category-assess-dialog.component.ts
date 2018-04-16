import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ControlCategoryAssess } from './control-category-assess.model';
import { ControlCategoryAssessPopupService } from './control-category-assess-popup.service';
import { ControlCategoryAssessService } from './control-category-assess.service';
import { ControlAssess, ControlAssessService } from '../control-assess';

@Component({
    selector: 'jhi-control-category-assess-dialog',
    templateUrl: './control-category-assess-dialog.component.html'
})
export class ControlCategoryAssessDialogComponent implements OnInit {

    controlCategory: ControlCategoryAssess;
    isSaving: boolean;

    controls: ControlAssess[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private controlCategoryService: ControlCategoryAssessService,
        private controlService: ControlAssessService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.controlService.query()
            .subscribe((res: HttpResponse<ControlAssess[]>) => { this.controls = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.controlCategory.id !== undefined) {
            this.subscribeToSaveResponse(
                this.controlCategoryService.update(this.controlCategory));
        } else {
            this.subscribeToSaveResponse(
                this.controlCategoryService.create(this.controlCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ControlCategoryAssess>>) {
        result.subscribe((res: HttpResponse<ControlCategoryAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ControlCategoryAssess) {
        this.eventManager.broadcast({ name: 'controlCategoryListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
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
    selector: 'jhi-control-category-assess-popup',
    template: ''
})
export class ControlCategoryAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private controlCategoryPopupService: ControlCategoryAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.controlCategoryPopupService
                    .open(ControlCategoryAssessDialogComponent as Component, params['id']);
            } else {
                this.controlCategoryPopupService
                    .open(ControlCategoryAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
