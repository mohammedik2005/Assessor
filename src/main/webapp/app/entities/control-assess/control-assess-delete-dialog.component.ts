import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAssess } from './control-assess.model';
import { ControlAssessPopupService } from './control-assess-popup.service';
import { ControlAssessService } from './control-assess.service';

@Component({
    selector: 'jhi-control-assess-delete-dialog',
    templateUrl: './control-assess-delete-dialog.component.html'
})
export class ControlAssessDeleteDialogComponent {

    control: ControlAssess;

    constructor(
        private controlService: ControlAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.controlService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'controlListModification',
                content: 'Deleted an control'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-control-assess-delete-popup',
    template: ''
})
export class ControlAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private controlPopupService: ControlAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.controlPopupService
                .open(ControlAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
