/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { AssessorTestModule } from '../../../test.module';
import { DomainAssessDialogComponent } from '../../../../../../main/webapp/app/entities/domain-assess/domain-assess-dialog.component';
import { DomainAssessService } from '../../../../../../main/webapp/app/entities/domain-assess/domain-assess.service';
import { DomainAssess } from '../../../../../../main/webapp/app/entities/domain-assess/domain-assess.model';
import { AttachmentAssessService } from '../../../../../../main/webapp/app/entities/attachment-assess';
import { PrinciplesAssessService } from '../../../../../../main/webapp/app/entities/principles-assess';
import { ControlAssessService } from '../../../../../../main/webapp/app/entities/control-assess';

describe('Component Tests', () => {

    describe('DomainAssess Management Dialog Component', () => {
        let comp: DomainAssessDialogComponent;
        let fixture: ComponentFixture<DomainAssessDialogComponent>;
        let service: DomainAssessService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [DomainAssessDialogComponent],
                providers: [
                    AttachmentAssessService,
                    PrinciplesAssessService,
                    ControlAssessService,
                    DomainAssessService
                ]
            })
            .overrideTemplate(DomainAssessDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DomainAssessDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DomainAssessService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DomainAssess(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.domain = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'domainListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DomainAssess();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.domain = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'domainListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
