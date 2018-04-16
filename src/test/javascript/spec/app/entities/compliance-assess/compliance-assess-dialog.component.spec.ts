/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceAssessDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-assess/compliance-assess-dialog.component';
import { ComplianceAssessService } from '../../../../../../main/webapp/app/entities/compliance-assess/compliance-assess.service';
import { ComplianceAssess } from '../../../../../../main/webapp/app/entities/compliance-assess/compliance-assess.model';
import { ComplianceValuesAssessService } from '../../../../../../main/webapp/app/entities/compliance-values-assess';
import { ControlAssessService } from '../../../../../../main/webapp/app/entities/control-assess';
import { ComplianceFlagAssessService } from '../../../../../../main/webapp/app/entities/compliance-flag-assess';

describe('Component Tests', () => {

    describe('ComplianceAssess Management Dialog Component', () => {
        let comp: ComplianceAssessDialogComponent;
        let fixture: ComponentFixture<ComplianceAssessDialogComponent>;
        let service: ComplianceAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceAssessDialogComponent],
                providers: [
                    ComplianceValuesAssessService,
                    ControlAssessService,
                    ComplianceFlagAssessService,
                    ComplianceAssessService
                ]
            })
            .overrideTemplate(ComplianceAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.compliance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.compliance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
