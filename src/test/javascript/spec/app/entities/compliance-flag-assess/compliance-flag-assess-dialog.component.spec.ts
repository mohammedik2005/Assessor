/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceFlagAssessDialogComponent } from '../../../../../../main/webapp/app/entities/compliance-flag-assess/compliance-flag-assess-dialog.component';
import { ComplianceFlagAssessService } from '../../../../../../main/webapp/app/entities/compliance-flag-assess/compliance-flag-assess.service';
import { ComplianceFlagAssess } from '../../../../../../main/webapp/app/entities/compliance-flag-assess/compliance-flag-assess.model';

describe('Component Tests', () => {

    describe('ComplianceFlagAssess Management Dialog Component', () => {
        let comp: ComplianceFlagAssessDialogComponent;
        let fixture: ComponentFixture<ComplianceFlagAssessDialogComponent>;
        let service: ComplianceFlagAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceFlagAssessDialogComponent],
                providers: [
                    ComplianceFlagAssessService
                ]
            })
            .overrideTemplate(ComplianceFlagAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceFlagAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceFlagAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceFlagAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceFlag = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceFlagListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ComplianceFlagAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.complianceFlag = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'complianceFlagListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
