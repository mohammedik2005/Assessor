/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ControlPriorityAssessDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/control-priority-assess/control-priority-assess-delete-dialog.component';
import { ControlPriorityAssessService } from '../../../../../../main/webapp/app/entities/control-priority-assess/control-priority-assess.service';

describe('Component Tests', () => {

    describe('ControlPriorityAssess Management Delete Component', () => {
        let comp: ControlPriorityAssessDeleteDialogComponent;
        let fixture: ComponentFixture<ControlPriorityAssessDeleteDialogComponent>;
        let service: ControlPriorityAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ControlPriorityAssessDeleteDialogComponent],
                providers: [
                    ControlPriorityAssessService
                ]
            })
            .overrideTemplate(ControlPriorityAssessDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ControlPriorityAssessDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ControlPriorityAssessService);
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
