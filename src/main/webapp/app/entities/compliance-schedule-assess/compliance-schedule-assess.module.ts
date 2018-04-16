import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ComplianceScheduleAssessService,
    ComplianceScheduleAssessPopupService,
    ComplianceScheduleAssessComponent,
    ComplianceScheduleAssessDetailComponent,
    ComplianceScheduleAssessDialogComponent,
    ComplianceScheduleAssessPopupComponent,
    ComplianceScheduleAssessDeletePopupComponent,
    ComplianceScheduleAssessDeleteDialogComponent,
    complianceScheduleRoute,
    complianceSchedulePopupRoute,
    ComplianceScheduleAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...complianceScheduleRoute,
    ...complianceSchedulePopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComplianceScheduleAssessComponent,
        ComplianceScheduleAssessDetailComponent,
        ComplianceScheduleAssessDialogComponent,
        ComplianceScheduleAssessDeleteDialogComponent,
        ComplianceScheduleAssessPopupComponent,
        ComplianceScheduleAssessDeletePopupComponent,
    ],
    entryComponents: [
        ComplianceScheduleAssessComponent,
        ComplianceScheduleAssessDialogComponent,
        ComplianceScheduleAssessPopupComponent,
        ComplianceScheduleAssessDeleteDialogComponent,
        ComplianceScheduleAssessDeletePopupComponent,
    ],
    providers: [
        ComplianceScheduleAssessService,
        ComplianceScheduleAssessPopupService,
        ComplianceScheduleAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorComplianceScheduleAssessModule {}
