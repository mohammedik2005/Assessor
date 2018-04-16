import { BaseEntity } from './../../shared';

export class ComplianceStatusAssess implements BaseEntity {
    constructor(
        public id?: number,
        public statusAr?: string,
        public statusEn?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public values?: BaseEntity[],
    ) {
    }
}
