/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceEvidenceStatusAssessDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess-delete-dialog.component';
import { ComplianceEvidenceStatusAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess.service';

describe('Component Tests', () => {

    describe('ComplianceEvidenceStatusAssess Management Delete Component', () => {
        let comp: ComplianceEvidenceStatusAssessDeleteDialogComponent;
        let fixture: ComponentFixture<ComplianceEvidenceStatusAssessDeleteDialogComponent>;
        let service: ComplianceEvidenceStatusAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceEvidenceStatusAssessDeleteDialogComponent],
                providers: [
                    ComplianceEvidenceStatusAssessService
                ]
            })
            .overrideTemplate(ComplianceEvidenceStatusAssessDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceEvidenceStatusAssessDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceEvidenceStatusAssessService);
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
