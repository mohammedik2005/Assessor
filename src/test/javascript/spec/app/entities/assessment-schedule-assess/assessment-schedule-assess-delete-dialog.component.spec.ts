/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { AssessmentScheduleAssessDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess-delete-dialog.component';
import { AssessmentScheduleAssessService } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess.service';

describe('Component Tests', () => {

    describe('AssessmentScheduleAssess Management Delete Component', () => {
        let comp: AssessmentScheduleAssessDeleteDialogComponent;
        let fixture: ComponentFixture<AssessmentScheduleAssessDeleteDialogComponent>;
        let service: AssessmentScheduleAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [AssessmentScheduleAssessDeleteDialogComponent],
                providers: [
                    AssessmentScheduleAssessService
                ]
            })
            .overrideTemplate(AssessmentScheduleAssessDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssessmentScheduleAssessDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssessmentScheduleAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
