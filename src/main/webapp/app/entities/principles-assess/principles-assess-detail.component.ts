import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PrinciplesAssess } from './principles-assess.model';
import { PrinciplesAssessService } from './principles-assess.service';

@Component({
    selector: 'jhi-principles-assess-detail',
    templateUrl: './principles-assess-detail.component.html'
})
export class PrinciplesAssessDetailComponent implements OnInit, OnDestroy {

    principles: PrinciplesAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private principlesService: PrinciplesAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPrinciples();
    }

    load(id) {
        this.principlesService.find(id)
            .subscribe((principlesResponse: HttpResponse<PrinciplesAssess>) => {
                this.principles = principlesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPrinciples() {
        this.eventSubscriber = this.eventManager.subscribe(
            'principlesListModification',
            (response) => this.load(this.principles.id)
        );
    }
}
