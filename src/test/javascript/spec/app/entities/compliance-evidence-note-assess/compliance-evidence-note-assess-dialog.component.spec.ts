/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceEvidenceNoteAssessDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-evidence-note-assess/compliance-evidence-note-assess-dialog.component';
import { ComplianceEvidenceNoteAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-note-assess/compliance-evidence-note-assess.service';
import { ComplianceEvidenceNoteAssess } from '../../../../../../main/webapp/app/entities/compliance-evidence-note-assess/compliance-evidence-note-assess.model';
import { ComplianceValuesAssessService } from '../../../../../../main/webapp/app/entities/compliance-values-assess';

describe('Component Tests', () => {

    describe('ComplianceEvidenceNoteAssess Management Dialog Component', () => {
        let comp: ComplianceEvidenceNoteAssessDialogComponent;
        let fixture: ComponentFixture<ComplianceEvidenceNoteAssessDialogComponent>;
        let service: ComplianceEvidenceNoteAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceEvidenceNoteAssessDialogComponent],
                providers: [
                    ComplianceValuesAssessService,
                    ComplianceEvidenceNoteAssessService
                ]
            })
            .overrideTemplate(ComplianceEvidenceNoteAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceEvidenceNoteAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceEvidenceNoteAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceEvidenceNoteAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceEvidenceNote = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceEvidenceNoteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceEvidenceNoteAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceEvidenceNote = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceEvidenceNoteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
