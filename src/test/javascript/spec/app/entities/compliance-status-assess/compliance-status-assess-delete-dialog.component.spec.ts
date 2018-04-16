/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceStatusAssessDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-status-assess/compliance-status-assess-delete-dialog.component';
import { ComplianceStatusAssessService } from '../../../../../../main/webapp/app/entities/compliance-status-assess/compliance-status-assess.service';

describe('Component Tests', () => {

    describe('ComplianceStatusAssess Management Delete Component', () => {
        let comp: ComplianceStatusAssessDeleteDialogComponent;
        let fixture: ComponentFixture<ComplianceStatusAssessDeleteDialogComponent>;
        let service: ComplianceStatusAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceStatusAssessDeleteDialogComponent],
                providers: [
                    ComplianceStatusAssessService
                ]
            })
            .overrideTemplate(ComplianceStatusAssessDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceStatusAssessDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceStatusAssessService);
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
