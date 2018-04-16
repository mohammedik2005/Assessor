import { BaseEntity } from './../../shared';

export class ComplianceEvidenceNoteAssess implements BaseEntity {
    constructor(
        public id?: number,
        public text?: any,
        public values?: BaseEntity[],
    ) {
    }
}
