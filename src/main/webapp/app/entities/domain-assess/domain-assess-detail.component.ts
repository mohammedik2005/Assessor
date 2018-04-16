import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DomainAssess } from './domain-assess.model';
import { DomainAssessService } from './domain-assess.service';

@Component({
    selector: 'jhi-domain-assess-detail',
    templateUrl: './domain-assess-detail.component.html'
})
export class DomainAssessDetailComponent implements OnInit, OnDestroy {

    domain: DomainAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private domainService: DomainAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDomains();
    }

    load(id) {
        this.domainService.find(id)
            .subscribe((domainResponse: HttpResponse<DomainAssess>) => {
                this.domain = domainResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDomains() {
        this.eventSubscriber = this.eventManager.subscribe(
            'domainListModification',
            (response) => this.load(this.domain.id)
        );
    }
}
