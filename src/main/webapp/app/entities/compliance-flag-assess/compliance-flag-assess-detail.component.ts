import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceFlagAssess } from './compliance-flag-assess.model';
import { ComplianceFlagAssessService } from './compliance-flag-assess.service';

@Component({
    selector: 'jhi-compliance-flag-assess-detail',
    templateUrl: './compliance-flag-assess-detail.component.html'
})
export class ComplianceFlagAssessDetailComponent implements OnInit, OnDestroy {

    complianceFlag: ComplianceFlagAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private complianceFlagService: ComplianceFlagAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComplianceFlags();
    }

    load(id) {
        this.complianceFlagService.find(id)
            .subscribe((complianceFlagResponse: HttpResponse<ComplianceFlagAssess>) => {
                this.complianceFlag = complianceFlagResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComplianceFlags() {
        this.eventSubscriber = this.eventManager.subscribe(
            'complianceFlagListModification',
            (response) => this.load(this.complianceFlag.id)
        );
    }
}
