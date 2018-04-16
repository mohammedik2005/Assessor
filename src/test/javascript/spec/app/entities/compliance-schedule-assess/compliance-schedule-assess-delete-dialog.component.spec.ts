/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceScheduleAssessDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess-delete-dialog.component';
import { ComplianceScheduleAssessService } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess.service';

describe('Component Tests', () => {

    describe('ComplianceScheduleAssess Management Delete Component', () => {
        let comp: ComplianceScheduleAssessDeleteDialogComponent;
        let fixture: ComponentFixture<ComplianceScheduleAssessDeleteDialogComponent>;
        let service: ComplianceScheduleAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceScheduleAssessDeleteDialogComponent],
                providers: [
                    ComplianceScheduleAssessService
                ]
            })
            .overrideTemplate(ComplianceScheduleAssessDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceScheduleAssessDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceScheduleAssessService);
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
