import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrinciplesAssess } from './principles-assess.model';
import { PrinciplesAssessPopupService } from './principles-assess-popup.service';
import { PrinciplesAssessService } from './principles-assess.service';

@Component({
    selector: 'jhi-principles-assess-delete-dialog',
    templateUrl: './principles-assess-delete-dialog.component.html'
})
export class PrinciplesAssessDeleteDialogComponent {

    principles: PrinciplesAssess;

    constructor(
        private principlesService: PrinciplesAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.principlesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'principlesListModification',
                content: 'Deleted an principles'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-principles-assess-delete-popup',
    template: ''
})
export class PrinciplesAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private principlesPopupService: PrinciplesAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.principlesPopupService
                .open(PrinciplesAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
