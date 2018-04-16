/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { ControlCategoryAssessDialogComponent } from '../../../../../../main/webapp/app/entities/control-category-assess/control-category-assess-dialog.component';
import { ControlCategoryAssessService } from '../../../../../../main/webapp/app/entities/control-category-assess/control-category-assess.service';
import { ControlCategoryAssess } from '../../../../../../main/webapp/app/entities/control-category-assess/control-category-assess.model';
import { ControlAssessService } from '../../../../../../main/webapp/app/entities/control-assess';

describe('Component Tests', () => {

    describe('ControlCategoryAssess Management Dialog Component', () => {
        let comp: ControlCategoryAssessDialogComponent;
        let fixture: ComponentFixture<ControlCategoryAssessDialogComponent>;
        let service: ControlCategoryAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ControlCategoryAssessDialogComponent],
                providers: [
                    ControlAssessService,
                    ControlCategoryAssessService
                ]
            })
            .overrideTemplate(ControlCategoryAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ControlCategoryAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ControlCategoryAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ControlCategoryAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.controlCategory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'controlCategoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ControlCategoryAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.controlCategory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'controlCategoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
