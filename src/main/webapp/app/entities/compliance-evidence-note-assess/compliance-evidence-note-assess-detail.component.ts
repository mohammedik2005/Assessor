import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ComplianceEvidenceNoteAssess } from './compliance-evidence-note-assess.model';
import { ComplianceEvidenceNoteAssessService } from './compliance-evidence-note-assess.service';

@Component({
    selector: 'jhi-compliance-evidence-note-assess-detail',
    templateUrl: './compliance-evidence-note-assess-detail.component.html'
})
export class ComplianceEvidenceNoteAssessDetailComponent implements OnInit, OnDestroy {

    complianceEvidenceNote: ComplianceEvidenceNoteAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private complianceEvidenceNoteService: ComplianceEvidenceNoteAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComplianceEvidenceNotes();
    }

    load(id) {
        this.complianceEvidenceNoteService.find(id)
            .subscribe((complianceEvidenceNoteResponse: HttpResponse<ComplianceEvidenceNoteAssess>) => {
                this.complianceEvidenceNote = complianceEvidenceNoteResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComplianceEvidenceNotes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'complianceEvidenceNoteListModification',
            (response) => this.load(this.complianceEvidenceNote.id)
        );
    }
}
