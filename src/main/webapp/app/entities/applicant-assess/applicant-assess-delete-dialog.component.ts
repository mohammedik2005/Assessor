import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ApplicantAssess } from './applicant-assess.model';
import { ApplicantAssessPopupService } from './applicant-assess-popup.service';
import { ApplicantAssessService } from './applicant-assess.service';

@Component({
    selector: 'jhi-applicant-assess-delete-dialog',
    templateUrl: './applicant-assess-delete-dialog.component.html'
})
export class ApplicantAssessDeleteDialogComponent {

    applicant: ApplicantAssess;

    constructor(
        private applicantService: ApplicantAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.applicantService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'applicantListModification',
                content: 'Deleted an applicant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-applicant-assess-delete-popup',
    template: ''
})
export class ApplicantAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private applicantPopupService: ApplicantAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.applicantPopupService
                .open(ApplicantAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
