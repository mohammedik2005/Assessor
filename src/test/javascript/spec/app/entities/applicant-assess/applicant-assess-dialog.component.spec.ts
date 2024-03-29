/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ApplicantAssessDialogComponent } from '../../../../../../main/webapp/app/entities/applicant-assess/applicant-assess-dialog.component';
import { ApplicantAssessService } from '../../../../../../main/webapp/app/entities/applicant-assess/applicant-assess.service';
import { ApplicantAssess } from '../../../../../../main/webapp/app/entities/applicant-assess/applicant-assess.model';
import { ComplianceValuesAssessService } from '../../../../../../main/webapp/app/entities/compliance-values-assess';

describe('Component Tests', () => {

    describe('ApplicantAssess Management Dialog Component', () => {
        let comp: ApplicantAssessDialogComponent;
        let fixture: ComponentFixture<ApplicantAssessDialogComponent>;
        let service: ApplicantAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ApplicantAssessDialogComponent],
                providers: [
                    ComplianceValuesAssessService,
                    ApplicantAssessService
                ]
            })
            .overrideTemplate(ApplicantAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicantAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicantAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ApplicantAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.applicant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'applicantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ApplicantAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.applicant = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'applicantListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
