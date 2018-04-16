import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ControlAssess } from './control-assess.model';
import { ControlAssessService } from './control-assess.service';

@Component({
    selector: 'jhi-control-assess-detail',
    templateUrl: './control-assess-detail.component.html'
})
export class ControlAssessDetailComponent implements OnInit, OnDestroy {

    control: ControlAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private controlService: ControlAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInControls();
    }

    load(id) {
        this.controlService.find(id)
            .subscribe((controlResponse: HttpResponse<ControlAssess>) => {
                this.control = controlResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInControls() {
        this.eventSubscriber = this.eventManager.subscribe(
            'controlListModification',
            (response) => this.load(this.control.id)
        );
    }
}
