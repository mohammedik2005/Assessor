import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ControlCategoryAssessService,
    ControlCategoryAssessPopupService,
    ControlCategoryAssessComponent,
    ControlCategoryAssessDetailComponent,
    ControlCategoryAssessDialogComponent,
    ControlCategoryAssessPopupComponent,
    ControlCategoryAssessDeletePopupComponent,
    ControlCategoryAssessDeleteDialogComponent,
    controlCategoryRoute,
    controlCategoryPopupRoute,
    ControlCategoryAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...controlCategoryRoute,
    ...controlCategoryPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ControlCategoryAssessComponent,
        ControlCategoryAssessDetailComponent,
        ControlCategoryAssessDialogComponent,
        ControlCategoryAssessDeleteDialogComponent,
        ControlCategoryAssessPopupComponent,
        ControlCategoryAssessDeletePopupComponent,
    ],
    entryComponents: [
        ControlCategoryAssessComponent,
        ControlCategoryAssessDialogComponent,
        ControlCategoryAssessPopupComponent,
        ControlCategoryAssessDeleteDialogComponent,
        ControlCategoryAssessDeletePopupComponent,
    ],
    providers: [
        ControlCategoryAssessService,
        ControlCategoryAssessPopupService,
        ControlCategoryAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorControlCategoryAssessModule {}
