import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ComplianceValuesAssessService,
    ComplianceValuesAssessPopupService,
    ComplianceValuesAssessComponent,
    ComplianceValuesAssessDetailComponent,
    ComplianceValuesAssessDialogComponent,
    ComplianceValuesAssessPopupComponent,
    ComplianceValuesAssessDeletePopupComponent,
    ComplianceValuesAssessDeleteDialogComponent,
    complianceValuesRoute,
    complianceValuesPopupRoute,
    ComplianceValuesAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...complianceValuesRoute,
    ...complianceValuesPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComplianceValuesAssessComponent,
        ComplianceValuesAssessDetailComponent,
        ComplianceValuesAssessDialogComponent,
        ComplianceValuesAssessDeleteDialogComponent,
        ComplianceValuesAssessPopupComponent,
        ComplianceValuesAssessDeletePopupComponent,
    ],
    entryComponents: [
        ComplianceValuesAssessComponent,
        ComplianceValuesAssessDialogComponent,
        ComplianceValuesAssessPopupComponent,
        ComplianceValuesAssessDeleteDialogComponent,
        ComplianceValuesAssessDeletePopupComponent,
    ],
    providers: [
        ComplianceValuesAssessService,
        ComplianceValuesAssessPopupService,
        ComplianceValuesAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorComplianceValuesAssessModule {}
