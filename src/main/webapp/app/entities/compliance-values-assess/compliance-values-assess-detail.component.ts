import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceValuesAssess } from './compliance-values-assess.model';
import { ComplianceValuesAssessService } from './compliance-values-assess.service';

@Component({
    selector: 'jhi-compliance-values-assess-detail',
    templateUrl: './compliance-values-assess-detail.component.html'
})
export class ComplianceValuesAssessDetailComponent implements OnInit, OnDestroy {

    complianceValues: ComplianceValuesAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private complianceValuesService: ComplianceValuesAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComplianceValues();
    }

    load(id) {
        this.complianceValuesService.find(id)
            .subscribe((complianceValuesResponse: HttpResponse<ComplianceValuesAssess>) => {
                this.complianceValues = complianceValuesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComplianceValues() {
        this.eventSubscriber = this.eventManager.subscribe(
            'complianceValuesListModification',
            (response) => this.load(this.complianceValues.id)
        );
    }
}
