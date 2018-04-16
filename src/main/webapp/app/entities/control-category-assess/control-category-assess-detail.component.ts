import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ControlCategoryAssess } from './control-category-assess.model';
import { ControlCategoryAssessService } from './control-category-assess.service';

@Component({
    selector: 'jhi-control-category-assess-detail',
    templateUrl: './control-category-assess-detail.component.html'
})
export class ControlCategoryAssessDetailComponent implements OnInit, OnDestroy {

    controlCategory: ControlCategoryAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private controlCategoryService: ControlCategoryAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInControlCategories();
    }

    load(id) {
        this.controlCategoryService.find(id)
            .subscribe((controlCategoryResponse: HttpResponse<ControlCategoryAssess>) => {
                this.controlCategory = controlCategoryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInControlCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'controlCategoryListModification',
            (response) => this.load(this.controlCategory.id)
        );
    }
}
