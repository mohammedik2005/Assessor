import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceAssess } from './compliance-assess.model';
import { ComplianceAssessService } from './compliance-assess.service';

@Component({
    selector: 'jhi-compliance-assess-detail',
    templateUrl: './compliance-assess-detail.component.html'
})
export class ComplianceAssessDetailComponent implements OnInit, OnDestroy {

    compliance: ComplianceAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private complianceService: ComplianceAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCompliances();
    }

    load(id) {
        this.complianceService.find(id)
            .subscribe((complianceResponse: HttpResponse<ComplianceAssess>) => {
                this.compliance = complianceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCompliances() {
        this.eventSubscriber = this.eventManager.subscribe(
            'complianceListModification',
            (response) => this.load(this.compliance.id)
        );
    }
}
