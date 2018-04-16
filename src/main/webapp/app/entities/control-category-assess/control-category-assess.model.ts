import { BaseEntity } from './../../shared';

export class ControlCategoryAssess implements BaseEntity {
    constructor(
        public id?: number,
        public categoryAr?: string,
        public categoryEn?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public controls?: BaseEntity[],
    ) {
    }
}
