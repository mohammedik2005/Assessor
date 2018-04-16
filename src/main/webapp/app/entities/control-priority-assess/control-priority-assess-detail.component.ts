import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ControlPriorityAssess } from './control-priority-assess.model';
import { ControlPriorityAssessService } from './control-priority-assess.service';

@Component({
    selector: 'jhi-control-priority-assess-detail',
    templateUrl: './control-priority-assess-detail.component.html'
})
export class ControlPriorityAssessDetailComponent implements OnInit, OnDestroy {

    controlPriority: ControlPriorityAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private controlPriorityService: ControlPriorityAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInControlPriorities();
    }

    load(id) {
        this.controlPriorityService.find(id)
            .subscribe((controlPriorityResponse: HttpResponse<ControlPriorityAssess>) => {
                this.controlPriority = controlPriorityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInControlPriorities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'controlPriorityListModification',
            (response) => this.load(this.controlPriority.id)
        );
    }
}
