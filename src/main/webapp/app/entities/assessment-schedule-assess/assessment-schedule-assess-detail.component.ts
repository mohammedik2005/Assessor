import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AssessmentScheduleAssess } from './assessment-schedule-assess.model';
import { AssessmentScheduleAssessService } from './assessment-schedule-assess.service';

@Component({
    selector: 'jhi-assessment-schedule-assess-detail',
    templateUrl: './assessment-schedule-assess-detail.component.html'
})
export class AssessmentScheduleAssessDetailComponent implements OnInit, OnDestroy {

    assessmentSchedule: AssessmentScheduleAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private assessmentScheduleService: AssessmentScheduleAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssessmentSchedules();
    }

    load(id) {
        this.assessmentScheduleService.find(id)
            .subscribe((assessmentScheduleResponse: HttpResponse<AssessmentScheduleAssess>) => {
                this.assessmentSchedule = assessmentScheduleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssessmentSchedules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'assessmentScheduleListModification',
            (response) => this.load(this.assessmentSchedule.id)
        );
    }
}
