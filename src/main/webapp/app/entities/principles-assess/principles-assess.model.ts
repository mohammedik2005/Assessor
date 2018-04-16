import { BaseEntity } from './../../shared';

export class PrinciplesAssess implements BaseEntity {
    constructor(
        public id?: number,
        public nameAr?: string,
        public nameEn?: string,
        public descriptionAr?: string,
        public descriptionEn?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public domains?: BaseEntity[],
    ) {
    }
}
