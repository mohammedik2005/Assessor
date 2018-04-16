import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceEvidenceNoteAssess } from './compliance-evidence-note-assess.model';
import { ComplianceEvidenceNoteAssessPopupService } from './compliance-evidence-note-assess-popup.service';
import { ComplianceEvidenceNoteAssessService } from './compliance-evidence-note-assess.service';

@Component({
    selector: 'jhi-compliance-evidence-note-assess-delete-dialog',
    templateUrl: './compliance-evidence-note-assess-delete-dialog.component.html'
})
export class ComplianceEvidenceNoteAssessDeleteDialogComponent {

    complianceEvidenceNote: ComplianceEvidenceNoteAssess;

    constructor(
        private complianceEvidenceNoteService: ComplianceEvidenceNoteAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.complianceEvidenceNoteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'complianceEvidenceNoteListModification',
                content: 'Deleted an complianceEvidenceNote'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compliance-evidence-note-assess-delete-popup',
    template: ''
})
export class ComplianceEvidenceNoteAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private complianceEvidenceNotePopupService: ComplianceEvidenceNoteAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.complianceEvidenceNotePopupService
                .open(ComplianceEvidenceNoteAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
