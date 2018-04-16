/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceEvidenceTypeAssessDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-evidence-type-assess/compliance-evidence-type-assess-dialog.component';
import { ComplianceEvidenceTypeAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-type-assess/compliance-evidence-type-assess.service';
import { ComplianceEvidenceTypeAssess } from '../../../../../../main/webapp/app/entities/compliance-evidence-type-assess/compliance-evidence-type-assess.model';

describe('Component Tests', () => {

    describe('ComplianceEvidenceTypeAssess Management Dialog Component', () => {
        let comp: ComplianceEvidenceTypeAssessDialogComponent;
        let fixture: ComponentFixture<ComplianceEvidenceTypeAssessDialogComponent>;
        let service: ComplianceEvidenceTypeAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceEvidenceTypeAssessDialogComponent],
                providers: [
                    ComplianceEvidenceTypeAssessService
                ]
            })
            .overrideTemplate(ComplianceEvidenceTypeAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceEvidenceTypeAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceEvidenceTypeAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceEvidenceTypeAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceEvidenceType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceEvidenceTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceEvidenceTypeAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceEvidenceType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceEvidenceTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
