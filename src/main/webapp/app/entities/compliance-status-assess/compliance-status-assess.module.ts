import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    ComplianceStatusAssessService,
    ComplianceStatusAssessPopupService,
    ComplianceStatusAssessComponent,
    ComplianceStatusAssessDetailComponent,
    ComplianceStatusAssessDialogComponent,
    ComplianceStatusAssessPopupComponent,
    ComplianceStatusAssessDeletePopupComponent,
    ComplianceStatusAssessDeleteDialogComponent,
    complianceStatusRoute,
    complianceStatusPopupRoute,
    ComplianceStatusAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...complianceStatusRoute,
    ...complianceStatusPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ComplianceStatusAssessComponent,
        ComplianceStatusAssessDetailComponent,
        ComplianceStatusAssessDialogComponent,
        ComplianceStatusAssessDeleteDialogComponent,
        ComplianceStatusAssessPopupComponent,
        ComplianceStatusAssessDeletePopupComponent,
    ],
    entryComponents: [
        ComplianceStatusAssessComponent,
        ComplianceStatusAssessDialogComponent,
        ComplianceStatusAssessPopupComponent,
        ComplianceStatusAssessDeleteDialogComponent,
        ComplianceStatusAssessDeletePopupComponent,
    ],
    providers: [
        ComplianceStatusAssessService,
        ComplianceStatusAssessPopupService,
        ComplianceStatusAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorComplianceStatusAssessModule {}
