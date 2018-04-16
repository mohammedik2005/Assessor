import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ComplianceEvidenceStatusAssessService,
    ComplianceEvidenceStatusAssessPopupService,
    ComplianceEvidenceStatusAssessComponent,
    ComplianceEvidenceStatusAssessDetailComponent,
    ComplianceEvidenceStatusAssessDialogComponent,
    ComplianceEvidenceStatusAssessPopupComponent,
    ComplianceEvidenceStatusAssessDeletePopupComponent,
    ComplianceEvidenceStatusAssessDeleteDialogComponent,
    complianceEvidenceStatusRoute,
    complianceEvidenceStatusPopupRoute,
    ComplianceEvidenceStatusAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...complianceEvidenceStatusRoute,
    ...complianceEvidenceStatusPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComplianceEvidenceStatusAssessComponent,
        ComplianceEvidenceStatusAssessDetailComponent,
        ComplianceEvidenceStatusAssessDialogComponent,
        ComplianceEvidenceStatusAssessDeleteDialogComponent,
        ComplianceEvidenceStatusAssessPopupComponent,
        ComplianceEvidenceStatusAssessDeletePopupComponent,
    ],
    entryComponents: [
        ComplianceEvidenceStatusAssessComponent,
        ComplianceEvidenceStatusAssessDialogComponent,
        ComplianceEvidenceStatusAssessPopupComponent,
        ComplianceEvidenceStatusAssessDeleteDialogComponent,
        ComplianceEvidenceStatusAssessDeletePopupComponent,
    ],
    providers: [
        ComplianceEvidenceStatusAssessService,
        ComplianceEvidenceStatusAssessPopupService,
        ComplianceEvidenceStatusAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorComplianceEvidenceStatusAssessModule {}
