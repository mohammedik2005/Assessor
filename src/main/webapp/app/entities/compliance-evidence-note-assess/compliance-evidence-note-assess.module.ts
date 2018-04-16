import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ComplianceEvidenceNoteAssessService,
    ComplianceEvidenceNoteAssessPopupService,
    ComplianceEvidenceNoteAssessComponent,
    ComplianceEvidenceNoteAssessDetailComponent,
    ComplianceEvidenceNoteAssessDialogComponent,
    ComplianceEvidenceNoteAssessPopupComponent,
    ComplianceEvidenceNoteAssessDeletePopupComponent,
    ComplianceEvidenceNoteAssessDeleteDialogComponent,
    complianceEvidenceNoteRoute,
    complianceEvidenceNotePopupRoute,
    ComplianceEvidenceNoteAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...complianceEvidenceNoteRoute,
    ...complianceEvidenceNotePopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComplianceEvidenceNoteAssessComponent,
        ComplianceEvidenceNoteAssessDetailComponent,
        ComplianceEvidenceNoteAssessDialogComponent,
        ComplianceEvidenceNoteAssessDeleteDialogComponent,
        ComplianceEvidenceNoteAssessPopupComponent,
        ComplianceEvidenceNoteAssessDeletePopupComponent,
    ],
    entryComponents: [
        ComplianceEvidenceNoteAssessComponent,
        ComplianceEvidenceNoteAssessDialogComponent,
        ComplianceEvidenceNoteAssessPopupComponent,
        ComplianceEvidenceNoteAssessDeleteDialogComponent,
        ComplianceEvidenceNoteAssessDeletePopupComponent,
    ],
    providers: [
        ComplianceEvidenceNoteAssessService,
        ComplianceEvidenceNoteAssessPopupService,
        ComplianceEvidenceNoteAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorComplianceEvidenceNoteAssessModule {}
