import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AssessmentScheduleAssess } from './assessment-schedule-assess.model';
import { AssessmentScheduleAssessPopupService } from './assessment-schedule-assess-popup.service';
import { AssessmentScheduleAssessService } from './assessment-schedule-assess.service';

@Component({
    selector: 'jhi-assessment-schedule-assess-delete-dialog',
    templateUrl: './assessment-schedule-assess-delete-dialog.component.html'
})
export class AssessmentScheduleAssessDeleteDialogComponent {

    assessmentSchedule: AssessmentScheduleAssess;

    constructor(
        private assessmentScheduleService: AssessmentScheduleAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assessmentScheduleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assessmentScheduleListModification',
                content: 'Deleted an assessmentSchedule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assessment-schedule-assess-delete-popup',
    template: ''
})
export class AssessmentScheduleAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assessmentSchedulePopupService: AssessmentScheduleAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.assessmentSchedulePopupService
                .open(AssessmentScheduleAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
