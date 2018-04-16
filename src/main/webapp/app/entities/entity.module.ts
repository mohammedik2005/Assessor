import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AssessorPrinciplesAssessModule } from './principles-assess/principles-assess.module';
import { AssessorDomainAssessModule } from './domain-assess/domain-assess.module';
import { AssessorControlAssessModule } from './control-assess/control-assess.module';
import { AssessorControlPriorityAssessModule } from './control-priority-assess/control-priority-assess.module';
import { AssessorControlCategoryAssessModule } from './control-category-assess/control-category-assess.module';
import { AssessorComplianceAssessModule } from './compliance-assess/compliance-assess.module';
import { AssessorComplianceValuesAssessModule } from './compliance-values-assess/compliance-values-assess.module';
import { AssessorComplianceScheduleAssessModule } from './compliance-schedule-assess/compliance-schedule-assess.module';
import { AssessorAssessmentScheduleAssessModule } from './assessment-schedule-assess/assessment-schedule-assess.module';
import { AssessorComplianceEvidenceTypeAssessModule } from './compliance-evidence-type-assess/compliance-evidence-type-assess.module';
import { AssessorComplianceEvidenceNoteAssessModule } from './compliance-evidence-note-assess/compliance-evidence-note-assess.module';
import { AssessorComplianceEvidenceStatusAssessModule } from './compliance-evidence-status-assess/compliance-evidence-status-assess.module';
import { AssessorAttachmentAssessModule } from './attachment-assess/attachment-assess.module';
import { AssessorComplianceStatusAssessModule } from './compliance-status-assess/compliance-status-assess.module';
import { AssessorComplianceFlagAssessModule } from './compliance-flag-assess/compliance-flag-assess.module';
import { AssessorApplicantAssessModule } from './applicant-assess/applicant-assess.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AssessorPrinciplesAssessModule,
        AssessorDomainAssessModule,
        AssessorControlAssessModule,
        AssessorControlPriorityAssessModule,
        AssessorControlCategoryAssessModule,
        AssessorComplianceAssessModule,
        AssessorComplianceValuesAssessModule,
        AssessorComplianceScheduleAssessModule,
        AssessorAssessmentScheduleAssessModule,
        AssessorComplianceEvidenceTypeAssessModule,
        AssessorComplianceEvidenceNoteAssessModule,
        AssessorComplianceEvidenceStatusAssessModule,
        AssessorAttachmentAssessModule,
        AssessorComplianceStatusAssessModule,
        AssessorComplianceFlagAssessModule,
        AssessorApplicantAssessModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AssessorEntityModule {}
