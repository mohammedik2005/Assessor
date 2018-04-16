import { BaseEntity } from './../../shared';

export class ComplianceAssess implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public descriptionAr?: string,
        public descriptionEn?: string,
        public complianceVersion?: number,
        public version?: number,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public values?: BaseEntity[],
        public controlId?: number,
        public complianceFlagId?: number,
    ) {
    }
}
