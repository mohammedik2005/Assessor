import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrinciplesAssess } from './principles-assess.model';
import { PrinciplesAssessPopupService } from './principles-assess-popup.service';
import { PrinciplesAssessService } from './principles-assess.service';

@Component({
    selector: 'jhi-principles-assess-dialog',
    templateUrl: './principles-assess-dialog.component.html'
})
export class PrinciplesAssessDialogComponent implements OnInit {

    principles: PrinciplesAssess;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private principlesService: PrinciplesAssessService,
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
        if (this.principles.id !== undefined) {
            this.subscribeToSaveResponse(
                this.principlesService.update(this.principles));
        } else {
            this.subscribeToSaveResponse(
                this.principlesService.create(this.principles));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PrinciplesAssess>>) {
        result.subscribe((res: HttpResponse<PrinciplesAssess>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PrinciplesAssess) {
        this.eventManager.broadcast({ name: 'principlesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-principles-assess-popup',
    template: ''
})
export class PrinciplesAssessPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private principlesPopupService: PrinciplesAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.principlesPopupService
                    .open(PrinciplesAssessDialogComponent as Component, params['id']);
            } else {
                this.principlesPopupService
                    .open(PrinciplesAssessDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
