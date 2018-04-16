/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { AttachmentAssessDialogComponent } from '../../../../../../main/webapp/app/entities/attachment-assess/attachment-assess-dialog.component';
import { AttachmentAssessService } from '../../../../../../main/webapp/app/entities/attachment-assess/attachment-assess.service';
import { AttachmentAssess } from '../../../../../../main/webapp/app/entities/attachment-assess/attachment-assess.model';
import { DomainAssessService } from '../../../../../../main/webapp/app/entities/domain-assess';
import { ComplianceValuesAssessService } from '../../../../../../main/webapp/app/entities/compliance-values-assess';
import { ControlAssessService } from '../../../../../../main/webapp/app/entities/control-assess';

describe('Component Tests', () => {

    describe('AttachmentAssess Management Dialog Component', () => {
        let comp: AttachmentAssessDialogComponent;
        let fixture: ComponentFixture<AttachmentAssessDialogComponent>;
        let service: AttachmentAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [AttachmentAssessDialogComponent],
                providers: [
                    DomainAssessService,
                    ComplianceValuesAssessService,
                    ControlAssessService,
                    AttachmentAssessService
                ]
            })
            .overrideTemplate(AttachmentAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttachmentAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttachmentAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AttachmentAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.attachment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'attachmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AttachmentAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.attachment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'attachmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
