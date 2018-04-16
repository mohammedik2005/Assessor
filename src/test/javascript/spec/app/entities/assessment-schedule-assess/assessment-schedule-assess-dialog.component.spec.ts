/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { AssessmentScheduleAssessDialogComponent } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess-dialog.component';
import { AssessmentScheduleAssessService } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess.service';
import { AssessmentScheduleAssess } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess.model';
import { ComplianceScheduleAssessService } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess';

describe('Component Tests', () => {

    describe('AssessmentScheduleAssess Management Dialog Component', () => {
        let comp: AssessmentScheduleAssessDialogComponent;
        let fixture: ComponentFixture<AssessmentScheduleAssessDialogComponent>;
        let service: AssessmentScheduleAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [AssessmentScheduleAssessDialogComponent],
                providers: [
                    ComplianceScheduleAssessService,
                    AssessmentScheduleAssessService
                ]
            })
            .overrideTemplate(AssessmentScheduleAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssessmentScheduleAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssessmentScheduleAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AssessmentScheduleAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.assessmentSchedule = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'assessmentScheduleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AssessmentScheduleAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.assessmentSchedule = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'assessmentScheduleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
