import { BaseEntity } from './../../shared';

export class DomainAssess implements BaseEntity {
    constructor(
        public id?: number,
        public nameAr?: string,
        public nameEn?: string,
        public descriptionAr?: string,
        public descriptionEn?: string,
        public code?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public attachments?: BaseEntity[],
        public principleId?: number,
        public controlId?: number,
    ) {
    }
}
