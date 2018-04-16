import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AssessorSharedModule } from '../../shared';
import {
    AttachmentAssessService,
    AttachmentAssessPopupService,
    AttachmentAssessComponent,
    AttachmentAssessDetailComponent,
    AttachmentAssessDialogComponent,
    AttachmentAssessPopupComponent,
    AttachmentAssessDeletePopupComponent,
    AttachmentAssessDeleteDialogComponent,
    attachmentRoute,
    attachmentPopupRoute,
    AttachmentAssessResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...attachmentRoute,
    ...attachmentPopupRoute,
];

@NgModule({
    imports: [
        AssessorSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AttachmentAssessComponent,
        AttachmentAssessDetailComponent,
        AttachmentAssessDialogComponent,
        AttachmentAssessDeleteDialogComponent,
        AttachmentAssessPopupComponent,
        AttachmentAssessDeletePopupComponent,
    ],
    entryComponents: [
        AttachmentAssessComponent,
        AttachmentAssessDialogComponent,
        AttachmentAssessPopupComponent,
        AttachmentAssessDeleteDialogComponent,
        AttachmentAssessDeletePopupComponent,
    ],
    providers: [
        AttachmentAssessService,
        AttachmentAssessPopupService,
        AttachmentAssessResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorAttachmentAssessModule {}
