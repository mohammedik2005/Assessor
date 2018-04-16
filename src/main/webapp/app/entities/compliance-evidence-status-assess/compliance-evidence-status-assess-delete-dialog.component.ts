import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceEvidenceStatusAssess } from './compliance-evidence-status-assess.model';
import { ComplianceEvidenceStatusAssessPopupService } from './compliance-evidence-status-assess-popup.service';
import { ComplianceEvidenceStatusAssessService } from './compliance-evidence-status-assess.service';

@Component({
    selector: 'jhi-compliance-evidence-status-assess-delete-dialog',
    templateUrl: './compliance-evidence-status-assess-delete-dialog.component.html'
})
export class ComplianceEvidenceStatusAssessDeleteDialogComponent {

    complianceEvidenceStatus: ComplianceEvidenceStatusAssess;

    constructor(
        private complianceEvidenceStatusService: ComplianceEvidenceStatusAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.complianceEvidenceStatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'complianceEvidenceStatusListModification',
                content: 'Deleted an complianceEvidenceStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compliance-evidence-status-assess-delete-popup',
    template: ''
})
export class ComplianceEvidenceStatusAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceEvidenceStatusPopupService: ComplianceEvidenceStatusAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.complianceEvidenceStatusPopupService
                .open(ComplianceEvidenceStatusAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
