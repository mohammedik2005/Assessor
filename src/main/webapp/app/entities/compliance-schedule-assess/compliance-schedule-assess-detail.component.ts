import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ComplianceScheduleAssess } from './compliance-schedule-assess.model';
import { ComplianceScheduleAssessService } from './compliance-schedule-assess.service';

@Component({
    selector: 'jhi-compliance-schedule-assess-detail',
    templateUrl: './compliance-schedule-assess-detail.component.html'
})
export class ComplianceScheduleAssessDetailComponent implements OnInit, OnDestroy {

    complianceSchedule: ComplianceScheduleAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private complianceScheduleService: ComplianceScheduleAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComplianceSchedules();
    }

    load(id) {
        this.complianceScheduleService.find(id)
            .subscribe((complianceScheduleResponse: HttpResponse<ComplianceScheduleAssess>) => {
                this.complianceSchedule = complianceScheduleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInComplianceSchedules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'complianceScheduleListModification',
            (response) => this.load(this.complianceSchedule.id)
        );
    }
}
