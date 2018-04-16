import { BaseEntity } from './../../shared';

export class ComplianceScheduleAssess implements BaseEntity {
    constructor(
        public id?: number,
        public text?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public values?: BaseEntity[],
        public assessments?: BaseEntity[],
    ) {
    }
}
