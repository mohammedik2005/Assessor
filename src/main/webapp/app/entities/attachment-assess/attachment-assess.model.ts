import { BaseEntity } from './../../shared';

export class AttachmentAssess implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public extension?: string,
        public generatedName?: string,
        public isActive?: number,
        public mimeType?: string,
        public originalName?: string,
        public tableName?: string,
        public createdDate?: any,
        public createdBy?: string,
        public modifiedDate?: any,
        public modifiedBy?: string,
        public domains?: BaseEntity[],
        public values?: BaseEntity[],
        public controls?: BaseEntity[],
    ) {
    }
}
