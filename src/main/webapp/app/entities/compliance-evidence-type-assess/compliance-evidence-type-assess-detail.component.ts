import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceEvidenceTypeAssess } from './compliance-evidence-type-assess.model';
import { ComplianceEvidenceTypeAssessService } from './compliance-evidence-type-assess.service';

@Component({
    selector: 'jhi-compliance-evidence-type-assess-detail',
    templateUrl: './compliance-evidence-type-assess-detail.component.html'
})
export class ComplianceEvidenceTypeAssessDetailComponent implements OnInit, OnDestroy {

    complianceEvidenceType: ComplianceEvidenceTypeAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private complianceEvidenceTypeService: ComplianceEvidenceTypeAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComplianceEvidenceTypes();
    }

    load(id) {
        this.complianceEvidenceTypeService.find(id)
            .subscribe((complianceEvidenceTypeResponse: HttpResponse<ComplianceEvidenceTypeAssess>) => {
                this.complianceEvidenceType = complianceEvidenceTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComplianceEvidenceTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'complianceEvidenceTypeListModification',
            (response) => this.load(this.complianceEvidenceType.id)
        );
    }
}
