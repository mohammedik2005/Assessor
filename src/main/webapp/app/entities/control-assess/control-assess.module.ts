import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ControlAssessService,
    ControlAssessPopupService,
    ControlAssessComponent,
    ControlAssessDetailComponent,
    ControlAssessDialogComponent,
    ControlAssessPopupComponent,
    ControlAssessDeletePopupComponent,
    ControlAssessDeleteDialogComponent,
    controlRoute,
    controlPopupRoute,
    ControlAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...controlRoute,
    ...controlPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ControlAssessComponent,
        ControlAssessDetailComponent,
        ControlAssessDialogComponent,
        ControlAssessDeleteDialogComponent,
        ControlAssessPopupComponent,
        ControlAssessDeletePopupComponent,
    ],
    entryComponents: [
        ControlAssessComponent,
        ControlAssessDialogComponent,
        ControlAssessPopupComponent,
        ControlAssessDeleteDialogComponent,
        ControlAssessDeletePopupComponent,
    ],
    providers: [
        ControlAssessService,
        ControlAssessPopupService,
        ControlAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorControlAssessModule {}
