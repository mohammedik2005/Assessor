/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { PrinciplesAssessDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/principles-assess/principles-assess-delete-dialog.component';
import { PrinciplesAssessService } from '../../../../../../main/webapp/app/entities/principles-assess/principles-assess.service';

describe('Component Tests', () => {

    describe('PrinciplesAssess Management Delete Component', () => {
        let comp: PrinciplesAssessDeleteDialogComponent;
        let fixture: ComponentFixture<PrinciplesAssessDeleteDialogComponent>;
        let service: PrinciplesAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [PrinciplesAssessDeleteDialogComponent],
                providers: [
                    PrinciplesAssessService
                ]
            })
            .overrideTemplate(PrinciplesAssessDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrinciplesAssessDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrinciplesAssessService);
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
