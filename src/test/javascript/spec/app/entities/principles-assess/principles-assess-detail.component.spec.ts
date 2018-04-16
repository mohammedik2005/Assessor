/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { PrinciplesAssessDetailComponent } from '../../../../../../main/webapp/app/entities/principles-assess/principles-assess-detail.component';
import { PrinciplesAssessService } from '../../../../../../main/webapp/app/entities/principles-assess/principles-assess.service';
import { PrinciplesAssess } from '../../../../../../main/webapp/app/entities/principles-assess/principles-assess.model';

describe('Component Tests', () => {

    describe('PrinciplesAssess Management Detail Component', () => {
        let comp: PrinciplesAssessDetailComponent;
        let fixture: ComponentFixture<PrinciplesAssessDetailComponent>;
        let service: PrinciplesAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [PrinciplesAssessDetailComponent],
                providers: [
                    PrinciplesAssessService
                ]
            })
            .overrideTemplate(PrinciplesAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PrinciplesAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrinciplesAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PrinciplesAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.principles).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
