import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ControlPriorityAssessService,
    ControlPriorityAssessPopupService,
    ControlPriorityAssessComponent,
    ControlPriorityAssessDetailComponent,
    ControlPriorityAssessDialogComponent,
    ControlPriorityAssessPopupComponent,
    ControlPriorityAssessDeletePopupComponent,
    ControlPriorityAssessDeleteDialogComponent,
    controlPriorityRoute,
    controlPriorityPopupRoute,
    ControlPriorityAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...controlPriorityRoute,
    ...controlPriorityPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ControlPriorityAssessComponent,
        ControlPriorityAssessDetailComponent,
        ControlPriorityAssessDialogComponent,
        ControlPriorityAssessDeleteDialogComponent,
        ControlPriorityAssessPopupComponent,
        ControlPriorityAssessDeletePopupComponent,
    ],
    entryComponents: [
        ControlPriorityAssessComponent,
        ControlPriorityAssessDialogComponent,
        ControlPriorityAssessPopupComponent,
        ControlPriorityAssessDeleteDialogComponent,
        ControlPriorityAssessDeletePopupComponent,
    ],
    providers: [
        ControlPriorityAssessService,
        ControlPriorityAssessPopupService,
        ControlPriorityAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorControlPriorityAssessModule {}
