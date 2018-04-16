import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceStatusAssess } from './compliance-status-assess.model';
import { ComplianceStatusAssessService } from './compliance-status-assess.service';

@Component({
    selector: 'jhi-compliance-status-assess-detail',
    templateUrl: './compliance-status-assess-detail.component.html'
})
export class ComplianceStatusAssessDetailComponent implements OnInit, OnDestroy {

    complianceStatus: ComplianceStatusAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private complianceStatusService: ComplianceStatusAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComplianceStatuses();
    }

    load(id) {
        this.complianceStatusService.find(id)
            .subscribe((complianceStatusResponse: HttpResponse<ComplianceStatusAssess>) => {
                this.complianceStatus = complianceStatusResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComplianceStatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'complianceStatusListModification',
            (response) => this.load(this.complianceStatus.id)
        );
    }
}
