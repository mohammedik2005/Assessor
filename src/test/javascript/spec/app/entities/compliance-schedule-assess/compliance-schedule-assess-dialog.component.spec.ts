/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceScheduleAssessDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess-dialog.component';
import { ComplianceScheduleAssessService } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess.service';
import { ComplianceScheduleAssess } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess.model';
import { AssessmentScheduleAssessService } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess';

describe('Component Tests', () => {

    describe('ComplianceScheduleAssess Management Dialog Component', () => {
        let comp: ComplianceScheduleAssessDialogComponent;
        let fixture: ComponentFixture<ComplianceScheduleAssessDialogComponent>;
        let service: ComplianceScheduleAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceScheduleAssessDialogComponent],
                providers: [
                    AssessmentScheduleAssessService,
                    ComplianceScheduleAssessService
                ]
            })
            .overrideTemplate(ComplianceScheduleAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceScheduleAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceScheduleAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceScheduleAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceSchedule = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceScheduleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceScheduleAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceSchedule = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceScheduleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
