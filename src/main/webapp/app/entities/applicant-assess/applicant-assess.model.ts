import { BaseEntity } from './../../shared';

export class ApplicantAssess implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public code?: string,
        public personName?: string,
        public jobTitle?: string,
        public department?: string,
        public email?: string,
        public phone?: string,
        public phoneExt?: string,
        public contactPerson?: string,
        public contactPhone?: string,
        public contactEmail?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public values?: BaseEntity[],
    ) {
    }
}
