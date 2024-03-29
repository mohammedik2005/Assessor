/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ControlAssessDialogComponent } from '../../../../../../main/webapp/app/entities/control-assess/control-assess-dialog.component';
import { ControlAssessService } from '../../../../../../main/webapp/app/entities/control-assess/control-assess.service';
import { ControlAssess } from '../../../../../../main/webapp/app/entities/control-assess/control-assess.model';
import { AttachmentAssessService } from '../../../../../../main/webapp/app/entities/attachment-assess';
import { ControlPriorityAssessService } from '../../../../../../main/webapp/app/entities/control-priority-assess';
import { ControlCategoryAssessService } from '../../../../../../main/webapp/app/entities/control-category-assess';

describe('Component Tests', () => {

    describe('ControlAssess Management Dialog Component', () => {
        let comp: ControlAssessDialogComponent;
        let fixture: ComponentFixture<ControlAssessDialogComponent>;
        let service: ControlAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ControlAssessDialogComponent],
                providers: [
                    AttachmentAssessService,
                    ControlPriorityAssessService,
                    ControlCategoryAssessService,
                    ControlAssessService
                ]
            })
            .overrideTemplate(ControlAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ControlAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ControlAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ControlAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.control = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'controlListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ControlAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.control = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'controlListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
