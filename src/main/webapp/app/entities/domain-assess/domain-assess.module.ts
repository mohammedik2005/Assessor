import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    DomainAssessService,
    DomainAssessPopupService,
    DomainAssessComponent,
    DomainAssessDetailComponent,
    DomainAssessDialogComponent,
    DomainAssessPopupComponent,
    DomainAssessDeletePopupComponent,
    DomainAssessDeleteDialogComponent,
    domainRoute,
    domainPopupRoute,
    DomainAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...domainRoute,
    ...domainPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DomainAssessComponent,
        DomainAssessDetailComponent,
        DomainAssessDialogComponent,
        DomainAssessDeleteDialogComponent,
        DomainAssessPopupComponent,
        DomainAssessDeletePopupComponent,
    ],
    entryComponents: [
        DomainAssessComponent,
        DomainAssessDialogComponent,
        DomainAssessPopupComponent,
        DomainAssessDeleteDialogComponent,
        DomainAssessDeletePopupComponent,
    ],
    providers: [
        DomainAssessService,
        DomainAssessPopupService,
        DomainAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorDomainAssessModule {}
