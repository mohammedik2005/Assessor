import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DomainAssess } from './domain-assess.model';
import { DomainAssessPopupService } from './domain-assess-popup.service';
import { DomainAssessService } from './domain-assess.service';

@Component({
    selector: 'jhi-domain-assess-delete-dialog',
    templateUrl: './domain-assess-delete-dialog.component.html'
})
export class DomainAssessDeleteDialogComponent {

    domain: DomainAssess;

    constructor(
        private domainService: DomainAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.domainService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'domainListModification',
                content: 'Deleted an domain'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-domain-assess-delete-popup',
    template: ''
})
export class DomainAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private domainPopupService: DomainAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.domainPopupService
                .open(DomainAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
