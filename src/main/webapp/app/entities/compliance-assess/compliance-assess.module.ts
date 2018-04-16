import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ComplianceAssessService,
    ComplianceAssessPopupService,
    ComplianceAssessComponent,
    ComplianceAssessDetailComponent,
    ComplianceAssessDialogComponent,
    ComplianceAssessPopupComponent,
    ComplianceAssessDeletePopupComponent,
    ComplianceAssessDeleteDialogComponent,
    complianceRoute,
    compliancePopupRoute,
    ComplianceAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...complianceRoute,
    ...compliancePopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComplianceAssessComponent,
        ComplianceAssessDetailComponent,
        ComplianceAssessDialogComponent,
        ComplianceAssessDeleteDialogComponent,
        ComplianceAssessPopupComponent,
        ComplianceAssessDeletePopupComponent,
    ],
    entryComponents: [
        ComplianceAssessComponent,
        ComplianceAssessDialogComponent,
        ComplianceAssessPopupComponent,
        ComplianceAssessDeleteDialogComponent,
        ComplianceAssessDeletePopupComponent,
    ],
    providers: [
        ComplianceAssessService,
        ComplianceAssessPopupService,
        ComplianceAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorComplianceAssessModule {}
