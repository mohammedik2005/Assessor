/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceEvidenceStatusAssessDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess-dialog.component';
import { ComplianceEvidenceStatusAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess.service';
import { ComplianceEvidenceStatusAssess } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess.model';

describe('Component Tests', () => {

    describe('ComplianceEvidenceStatusAssess Management Dialog Component', () => {
        let comp: ComplianceEvidenceStatusAssessDialogComponent;
        let fixture: ComponentFixture<ComplianceEvidenceStatusAssessDialogComponent>;
        let service: ComplianceEvidenceStatusAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceEvidenceStatusAssessDialogComponent],
                providers: [
                    ComplianceEvidenceStatusAssessService
                ]
            })
            .overrideTemplate(ComplianceEvidenceStatusAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceEvidenceStatusAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceEvidenceStatusAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceEvidenceStatusAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceEvidenceStatus = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceEvidenceStatusListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceEvidenceStatusAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceEvidenceStatus = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceEvidenceStatusListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
