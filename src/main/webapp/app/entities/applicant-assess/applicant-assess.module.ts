import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ApplicantAssessService,
    ApplicantAssessPopupService,
    ApplicantAssessComponent,
    ApplicantAssessDetailComponent,
    ApplicantAssessDialogComponent,
    ApplicantAssessPopupComponent,
    ApplicantAssessDeletePopupComponent,
    ApplicantAssessDeleteDialogComponent,
    applicantRoute,
    applicantPopupRoute,
    ApplicantAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...applicantRoute,
    ...applicantPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ApplicantAssessComponent,
        ApplicantAssessDetailComponent,
        ApplicantAssessDialogComponent,
        ApplicantAssessDeleteDialogComponent,
        ApplicantAssessPopupComponent,
        ApplicantAssessDeletePopupComponent,
    ],
    entryComponents: [
        ApplicantAssessComponent,
        ApplicantAssessDialogComponent,
        ApplicantAssessPopupComponent,
        ApplicantAssessDeleteDialogComponent,
        ApplicantAssessDeletePopupComponent,
    ],
    providers: [
        ApplicantAssessService,
        ApplicantAssessPopupService,
        ApplicantAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorApplicantAssessModule {}
