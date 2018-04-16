import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    AssessmentScheduleAssessService,
    AssessmentScheduleAssessPopupService,
    AssessmentScheduleAssessComponent,
    AssessmentScheduleAssessDetailComponent,
    AssessmentScheduleAssessDialogComponent,
    AssessmentScheduleAssessPopupComponent,
    AssessmentScheduleAssessDeletePopupComponent,
    AssessmentScheduleAssessDeleteDialogComponent,
    assessmentScheduleRoute,
    assessmentSchedulePopupRoute,
    AssessmentScheduleAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...assessmentScheduleRoute,
    ...assessmentSchedulePopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AssessmentScheduleAssessComponent,
        AssessmentScheduleAssessDetailComponent,
        AssessmentScheduleAssessDialogComponent,
        AssessmentScheduleAssessDeleteDialogComponent,
        AssessmentScheduleAssessPopupComponent,
        AssessmentScheduleAssessDeletePopupComponent,
    ],
    entryComponents: [
        AssessmentScheduleAssessComponent,
        AssessmentScheduleAssessDialogComponent,
        AssessmentScheduleAssessPopupComponent,
        AssessmentScheduleAssessDeleteDialogComponent,
        AssessmentScheduleAssessDeletePopupComponent,
    ],
    providers: [
        AssessmentScheduleAssessService,
        AssessmentScheduleAssessPopupService,
        AssessmentScheduleAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorAssessmentScheduleAssessModule {}
