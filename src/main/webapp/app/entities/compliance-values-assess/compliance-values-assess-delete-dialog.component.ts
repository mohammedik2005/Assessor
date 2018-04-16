import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceValuesAssess } from './compliance-values-assess.model';
import { ComplianceValuesAssessPopupService } from './compliance-values-assess-popup.service';
import { ComplianceValuesAssessService } from './compliance-values-assess.service';

@Component({
    selector: 'jhi-compliance-values-assess-delete-dialog',
    templateUrl: './compliance-values-assess-delete-dialog.component.html'
})
export class ComplianceValuesAssessDeleteDialogComponent {

    complianceValues: ComplianceValuesAssess;

    constructor(
        private complianceValuesService: ComplianceValuesAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.complianceValuesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'complianceValuesListModification',
                content: 'Deleted an complianceValues'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compliance-values-assess-delete-popup',
    template: ''
})
export class ComplianceValuesAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceValuesPopupService: ComplianceValuesAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.complianceValuesPopupService
                .open(ComplianceValuesAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
