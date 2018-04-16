import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ComplianceEvidenceTypeAssessService,
    ComplianceEvidenceTypeAssessPopupService,
    ComplianceEvidenceTypeAssessComponent,
    ComplianceEvidenceTypeAssessDetailComponent,
    ComplianceEvidenceTypeAssessDialogComponent,
    ComplianceEvidenceTypeAssessPopupComponent,
    ComplianceEvidenceTypeAssessDeletePopupComponent,
    ComplianceEvidenceTypeAssessDeleteDialogComponent,
    complianceEvidenceTypeRoute,
    complianceEvidenceTypePopupRoute,
    ComplianceEvidenceTypeAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...complianceEvidenceTypeRoute,
    ...complianceEvidenceTypePopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComplianceEvidenceTypeAssessComponent,
        ComplianceEvidenceTypeAssessDetailComponent,
        ComplianceEvidenceTypeAssessDialogComponent,
        ComplianceEvidenceTypeAssessDeleteDialogComponent,
        ComplianceEvidenceTypeAssessPopupComponent,
        ComplianceEvidenceTypeAssessDeletePopupComponent,
    ],
    entryComponents: [
        ComplianceEvidenceTypeAssessComponent,
        ComplianceEvidenceTypeAssessDialogComponent,
        ComplianceEvidenceTypeAssessPopupComponent,
        ComplianceEvidenceTypeAssessDeleteDialogComponent,
        ComplianceEvidenceTypeAssessDeletePopupComponent,
    ],
    providers: [
        ComplianceEvidenceTypeAssessService,
        ComplianceEvidenceTypeAssessPopupService,
        ComplianceEvidenceTypeAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorComplianceEvidenceTypeAssessModule {}
