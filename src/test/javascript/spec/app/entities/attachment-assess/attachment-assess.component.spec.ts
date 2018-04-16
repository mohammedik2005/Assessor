/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { AttachmentAssessComponent } from '../../../../../../main/webapp/app/entities/attachment-assess/attachment-assess.component';
import { AttachmentAssessService } from '../../../../../../main/webapp/app/entities/attachment-assess/attachment-assess.service';
import { AttachmentAssess } from '../../../../../../main/webapp/app/entities/attachment-assess/attachment-assess.model';

describe('Component Tests', () => {

    describe('AttachmentAssess Management Component', () => {
        let comp: AttachmentAssessComponent;
        let fixture: ComponentFixture<AttachmentAssessComponent>;
        let service: AttachmentAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [AttachmentAssessComponent],
                providers: [
                    AttachmentAssessService
                ]
            })
            .overrideTemplate(AttachmentAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AttachmentAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttachmentAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AttachmentAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.attachments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
