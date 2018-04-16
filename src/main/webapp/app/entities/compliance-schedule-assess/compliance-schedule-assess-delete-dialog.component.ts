import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceScheduleAssess } from './compliance-schedule-assess.model';
import { ComplianceScheduleAssessPopupService } from './compliance-schedule-assess-popup.service';
import { ComplianceScheduleAssessService } from './compliance-schedule-assess.service';

@Component({
    selector: 'jhi-compliance-schedule-assess-delete-dialog',
    templateUrl: './compliance-schedule-assess-delete-dialog.component.html'
})
export class ComplianceScheduleAssessDeleteDialogComponent {

    complianceSchedule: ComplianceScheduleAssess;

    constructor(
        private complianceScheduleService: ComplianceScheduleAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.complianceScheduleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'complianceScheduleListModification',
                content: 'Deleted an complianceSchedule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compliance-schedule-assess-delete-popup',
    template: ''
})
export class ComplianceScheduleAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceSchedulePopupService: ComplianceScheduleAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.complianceSchedulePopupService
                .open(ComplianceScheduleAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
