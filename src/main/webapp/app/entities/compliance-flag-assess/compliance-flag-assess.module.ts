import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ComplianceFlagAssessService,
    ComplianceFlagAssessPopupService,
    ComplianceFlagAssessComponent,
    ComplianceFlagAssessDetailComponent,
    ComplianceFlagAssessDialogComponent,
    ComplianceFlagAssessPopupComponent,
    ComplianceFlagAssessDeletePopupComponent,
    ComplianceFlagAssessDeleteDialogComponent,
    complianceFlagRoute,
    complianceFlagPopupRoute,
    ComplianceFlagAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...complianceFlagRoute,
    ...complianceFlagPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComplianceFlagAssessComponent,
        ComplianceFlagAssessDetailComponent,
        ComplianceFlagAssessDialogComponent,
        ComplianceFlagAssessDeleteDialogComponent,
        ComplianceFlagAssessPopupComponent,
        ComplianceFlagAssessDeletePopupComponent,
    ],
    entryComponents: [
        ComplianceFlagAssessComponent,
        ComplianceFlagAssessDialogComponent,
        ComplianceFlagAssessPopupComponent,
        ComplianceFlagAssessDeleteDialogComponent,
        ComplianceFlagAssessDeletePopupComponent,
    ],
    providers: [
        ComplianceFlagAssessService,
        ComplianceFlagAssessPopupService,
        ComplianceFlagAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorComplianceFlagAssessModule {}
