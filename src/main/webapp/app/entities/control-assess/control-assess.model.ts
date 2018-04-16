import { BaseEntity } from './../../shared';

export class ControlAssess implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public nameAr?: string,
        public nameEn?: string,
        public descriptionAr?: string,
        public descriptionEn?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public domains?: BaseEntity[],
        public compliances?: BaseEntity[],
        public attachments?: BaseEntity[],
        public priorityId?: number,
        public categories?: BaseEntity[],
    ) {
    }
}
