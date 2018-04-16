import { BaseEntity } from './../../shared';

export class AssessmentScheduleAssess implements BaseEntity {
    constructor(
        public id?: number,
        public fromDate?: any,
        public toDate?: any,
        public descriptionAr?: string,
        public descriptionEn?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public schedules?: BaseEntity[],
    ) {
    }
}
