import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceEvidenceTypeAssess } from './compliance-evidence-type-assess.model';
import { ComplianceEvidenceTypeAssessPopupService } from './compliance-evidence-type-assess-popup.service';
import { ComplianceEvidenceTypeAssessService } from './compliance-evidence-type-assess.service';

@Component({
    selector: 'jhi-compliance-evidence-type-assess-delete-dialog',
    templateUrl: './compliance-evidence-type-assess-delete-dialog.component.html'
})
export class ComplianceEvidenceTypeAssessDeleteDialogComponent {

    complianceEvidenceType: ComplianceEvidenceTypeAssess;

    constructor(
        private complianceEvidenceTypeService: ComplianceEvidenceTypeAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.complianceEvidenceTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'complianceEvidenceTypeListModification',
                content: 'Deleted an complianceEvidenceType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compliance-evidence-type-assess-delete-popup',
    template: ''
})
export class ComplianceEvidenceTypeAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceEvidenceTypePopupService: ComplianceEvidenceTypeAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.complianceEvidenceTypePopupService
                .open(ComplianceEvidenceTypeAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
