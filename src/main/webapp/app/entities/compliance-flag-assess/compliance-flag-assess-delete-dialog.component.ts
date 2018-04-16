import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceFlagAssess } from './compliance-flag-assess.model';
import { ComplianceFlagAssessPopupService } from './compliance-flag-assess-popup.service';
import { ComplianceFlagAssessService } from './compliance-flag-assess.service';

@Component({
    selector: 'jhi-compliance-flag-assess-delete-dialog',
    templateUrl: './compliance-flag-assess-delete-dialog.component.html'
})
export class ComplianceFlagAssessDeleteDialogComponent {

    complianceFlag: ComplianceFlagAssess;

    constructor(
        private complianceFlagService: ComplianceFlagAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.complianceFlagService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'complianceFlagListModification',
                content: 'Deleted an complianceFlag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compliance-flag-assess-delete-popup',
    template: ''
})
export class ComplianceFlagAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceFlagPopupService: ComplianceFlagAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.complianceFlagPopupService
                .open(ComplianceFlagAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
