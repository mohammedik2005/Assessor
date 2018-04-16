import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceEvidenceStatusAssess } from './compliance-evidence-status-assess.model';
import { ComplianceEvidenceStatusAssessService } from './compliance-evidence-status-assess.service';

@Component({
    selector: 'jhi-compliance-evidence-status-assess-detail',
    templateUrl: './compliance-evidence-status-assess-detail.component.html'
})
export class ComplianceEvidenceStatusAssessDetailComponent implements OnInit, OnDestroy {

    complianceEvidenceStatus: ComplianceEvidenceStatusAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private complianceEvidenceStatusService: ComplianceEvidenceStatusAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComplianceEvidenceStatuses();
    }

    load(id) {
        this.complianceEvidenceStatusService.find(id)
            .subscribe((complianceEvidenceStatusResponse: HttpResponse<ComplianceEvidenceStatusAssess>) => {
                this.complianceEvidenceStatus = complianceEvidenceStatusResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComplianceEvidenceStatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'complianceEvidenceStatusListModification',
            (response) => this.load(this.complianceEvidenceStatus.id)
        );
    }
}
