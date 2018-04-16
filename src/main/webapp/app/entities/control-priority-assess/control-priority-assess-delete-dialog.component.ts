import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ControlPriorityAssess } from './control-priority-assess.model';
import { ControlPriorityAssessPopupService } from './control-priority-assess-popup.service';
import { ControlPriorityAssessService } from './control-priority-assess.service';

@Component({
    selector: 'jhi-control-priority-assess-delete-dialog',
    templateUrl: './control-priority-assess-delete-dialog.component.html'
})
export class ControlPriorityAssessDeleteDialogComponent {

    controlPriority: ControlPriorityAssess;

    constructor(
        private controlPriorityService: ControlPriorityAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.controlPriorityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'controlPriorityListModification',
                content: 'Deleted an controlPriority'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-control-priority-assess-delete-popup',
    template: ''
})
export class ControlPriorityAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private controlPriorityPopupService: ControlPriorityAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.controlPriorityPopupService
                .open(ControlPriorityAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
