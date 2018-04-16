import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceStatusAssess } from './compliance-status-assess.model';
import { ComplianceStatusAssessPopupService } from './compliance-status-assess-popup.service';
import { ComplianceStatusAssessService } from './compliance-status-assess.service';

@Component({
    selector: 'jhi-compliance-status-assess-delete-dialog',
    templateUrl: './compliance-status-assess-delete-dialog.component.html'
})
export class ComplianceStatusAssessDeleteDialogComponent {

    complianceStatus: ComplianceStatusAssess;

    constructor(
        private complianceStatusService: ComplianceStatusAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.complianceStatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'complianceStatusListModification',
                content: 'Deleted an complianceStatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compliance-status-assess-delete-popup',
    template: ''
})
export class ComplianceStatusAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceStatusPopupService: ComplianceStatusAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.complianceStatusPopupService
                .open(ComplianceStatusAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
