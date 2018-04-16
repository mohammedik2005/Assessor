import { BaseEntity } from './../../shared';

export class ControlPriorityAssess implements BaseEntity {
    constructor(
        public id?: number,
        public nameAr?: string,
        public nameEn?: string,
        public code?: string,
        public order?: number,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public controls?: BaseEntity[],
    ) {
    }
}
