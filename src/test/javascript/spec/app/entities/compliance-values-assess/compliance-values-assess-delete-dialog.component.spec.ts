/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceValuesAssessDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess-delete-dialog.component';
import { ComplianceValuesAssessService } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess.service';

describe('Component Tests', () => {

    describe('ComplianceValuesAssess Management Delete Component', () => {
        let comp: ComplianceValuesAssessDeleteDialogComponent;
        let fixture: ComponentFixture<ComplianceValuesAssessDeleteDialogComponent>;
        let service: ComplianceValuesAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceValuesAssessDeleteDialogComponent],
                providers: [
                    ComplianceValuesAssessService
                ]
            })
            .overrideTemplate(ComplianceValuesAssessDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceValuesAssessDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceValuesAssessService);
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
