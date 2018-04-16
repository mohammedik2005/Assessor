/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { AttachmentAssessDetailComponent } from '../../../../../../main/webapp/app/entities/attachment-assess/attachment-assess-detail.component';
import { AttachmentAssessService } from '../../../../../../main/webapp/app/entities/attachment-assess/attachment-assess.service';
import { AttachmentAssess } from '../../../../../../main/webapp/app/entities/attachment-assess/attachment-assess.model';

describe('Component Tests', () => {

    describe('AttachmentAssess Management Detail Component', () => {
        let comp: AttachmentAssessDetailComponent;
        let fixture: ComponentFixture<AttachmentAssessDetailComponent>;
        let service: AttachmentAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [AttachmentAssessDetailComponent],
                providers: [
                    AttachmentAssessService
                ]
            })
            .overrideTemplate(AttachmentAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttachmentAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttachmentAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AttachmentAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.attachment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
