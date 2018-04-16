/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceValuesAssessDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess-dialog.component';
import { ComplianceValuesAssessService } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess.service';
import { ComplianceValuesAssess } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess.model';
import { AttachmentAssessService } from '../../../../../../main/webapp/app/entities/attachment-assess';
import { ComplianceStatusAssessService } from '../../../../../../main/webapp/app/entities/compliance-status-assess';
import { ComplianceScheduleAssessService } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess';
import { ComplianceEvidenceTypeAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-type-assess';
import { ComplianceEvidenceStatusAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess';
import { ApplicantAssessService } from '../../../../../../main/webapp/app/entities/applicant-assess';
import { ComplianceAssessService } from '../../../../../../main/webapp/app/entities/compliance-assess';
import { ComplianceEvidenceNoteAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-note-assess';

describe('Component Tests', () => {

    describe('ComplianceValuesAssess Management Dialog Component', () => {
        let comp: ComplianceValuesAssessDialogComponent;
        let fixture: ComponentFixture<ComplianceValuesAssessDialogComponent>;
        let service: ComplianceValuesAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceValuesAssessDialogComponent],
                providers: [
                    AttachmentAssessService,
                    ComplianceStatusAssessService,
                    ComplianceScheduleAssessService,
                    ComplianceEvidenceTypeAssessService,
                    ComplianceEvidenceStatusAssessService,
                    ApplicantAssessService,
                    ComplianceAssessService,
                    ComplianceEvidenceNoteAssessService,
                    ComplianceValuesAssessService
                ]
            })
            .overrideTemplate(ComplianceValuesAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceValuesAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceValuesAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceValuesAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceValues = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceValuesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceValuesAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceValues = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceValuesListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
