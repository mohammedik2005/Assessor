/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { PrinciplesAssessComponent } from '../../../../../../main/webapp/app/entities/principles-assess/principles-assess.component';
import { PrinciplesAssessService } from '../../../../../../main/webapp/app/entities/principles-assess/principles-assess.service';
import { PrinciplesAssess } from '../../../../../../main/webapp/app/entities/principles-assess/principles-assess.model';

describe('Component Tests', () => {

    describe('PrinciplesAssess Management Component', () => {
        let comp: PrinciplesAssessComponent;
        let fixture: ComponentFixture<PrinciplesAssessComponent>;
        let service: PrinciplesAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [PrinciplesAssessComponent],
                providers: [
                    PrinciplesAssessService
                ]
            })
            .overrideTemplate(PrinciplesAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrinciplesAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrinciplesAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PrinciplesAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.principles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
