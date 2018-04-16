import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ControlCategoryAssess } from './control-category-assess.model';
import { ControlCategoryAssessPopupService } from './control-category-assess-popup.service';
import { ControlCategoryAssessService } from './control-category-assess.service';

@Component({
    selector: 'jhi-control-category-assess-delete-dialog',
    templateUrl: './control-category-assess-delete-dialog.component.html'
})
export class ControlCategoryAssessDeleteDialogComponent {

    controlCategory: ControlCategoryAssess;

    constructor(
        private controlCategoryService: ControlCategoryAssessService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.controlCategoryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'controlCategoryListModification',
                content: 'Deleted an controlCategory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-control-category-assess-delete-popup',
    template: ''
})
export class ControlCategoryAssessDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private controlCategoryPopupService: ControlCategoryAssessPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.controlCategoryPopupService
                .open(ControlCategoryAssessDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
