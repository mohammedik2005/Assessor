import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    PrinciplesAssessService,
    PrinciplesAssessPopupService,
    PrinciplesAssessComponent,
    PrinciplesAssessDetailComponent,
    PrinciplesAssessDialogComponent,
    PrinciplesAssessPopupComponent,
    PrinciplesAssessDeletePopupComponent,
    PrinciplesAssessDeleteDialogComponent,
    principlesRoute,
    principlesPopupRoute,
    PrinciplesAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...principlesRoute,
    ...principlesPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrinciplesAssessComponent,
        PrinciplesAssessDetailComponent,
        PrinciplesAssessDialogComponent,
        PrinciplesAssessDeleteDialogComponent,
        PrinciplesAssessPopupComponent,
        PrinciplesAssessDeletePopupComponent,
    ],
    entryComponents: [
        PrinciplesAssessComponent,
        PrinciplesAssessDialogComponent,
        PrinciplesAssessPopupComponent,
        PrinciplesAssessDeleteDialogComponent,
        PrinciplesAssessDeletePopupComponent,
    ],
    providers: [
        PrinciplesAssessService,
        PrinciplesAssessPopupService,
        PrinciplesAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorPrinciplesAssessModule {}
