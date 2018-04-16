import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AttachmentAssess } from './attachment-assess.model';
import { AttachmentAssessService } from './attachment-assess.service';

@Component({
    selector: 'jhi-attachment-assess-detail',
    templateUrl: './attachment-assess-detail.component.html'
})
export class AttachmentAssessDetailComponent implements OnInit, OnDestroy {

    attachment: AttachmentAssess;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private attachmentService: AttachmentAssessService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAttachments();
    }

    load(id) {
        this.attachmentService.find(id)
            .subscribe((attachmentResponse: HttpResponse<AttachmentAssess>) => {
                this.attachment = attachmentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAttachments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'attachmentListModification',
            (response) => this.load(this.attachment.id)
        );
    }
}
