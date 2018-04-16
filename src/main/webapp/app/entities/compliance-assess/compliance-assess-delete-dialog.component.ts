import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceAssess } from './compliance-assess.model';
import { ComplianceAssessPopupService } from './compliance-assess-popup.service';
import { ComplianceAssessService } from './compliance-assess.service';

@Component({
    selector: 'jhi-compliance-assess-delete-dialog',
    templateUrl: './compliance-assess-delete-dialog.component.html'
})
export class ComplianceAssessDeleteDialogComponent {

    compliance: ComplianceAssess;

    constructor(
        private complianceService: ComplianceAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.complianceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'complianceListModification',
                content: 'Deleted an compliance'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compliance-assess-delete-popup',
    template: ''
})
export class ComplianceAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private compliancePopupService: ComplianceAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.compliancePopupService
                .open(ComplianceAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
