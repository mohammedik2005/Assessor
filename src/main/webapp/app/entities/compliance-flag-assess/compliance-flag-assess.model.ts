import { BaseEntity } from './../../shared';

export class ComplianceFlagAssess implements BaseEntity {
    constructor(
        public id?: number,
        public nameAr?: string,
        public nameEn?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public compliances?: BaseEntity[],
    ) {
    }
}
