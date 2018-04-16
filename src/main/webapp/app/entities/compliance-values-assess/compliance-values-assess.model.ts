import { BaseEntity } from './../../shared';

export class ComplianceValuesAssess implements BaseEntity {
    constructor(
        public id?: number,
        public ownership?: string,
        public justification?: string,
        public isCompleted?: number,
        public evidenceName?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public attachments?: BaseEntity[],
        public complianceStatusId?: number,
        public complianceScheduleId?: number,
        public evidenceTypeId?: number,
        public evidenceStatusId?: number,
        public applicants?: BaseEntity[],
        public compliances?: BaseEntity[],
        public notes?: BaseEntity[],
    ) {
    }
}
