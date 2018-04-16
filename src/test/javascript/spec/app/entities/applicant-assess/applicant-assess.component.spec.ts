/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ApplicantAssessComponent } from '../../../../../../main/webapp/app/entities/applicant-assess/applicant-assess.component';
import { ApplicantAssessService } from '../../../../../../main/webapp/app/entities/applicant-assess/applicant-assess.service';
import { ApplicantAssess } from '../../../../../../main/webapp/app/entities/applicant-assess/applicant-assess.model';

describe('Component Tests', () => {

    describe('ApplicantAssess Management Component', () => {
        let comp: ApplicantAssessComponent;
        let fixture: ComponentFixture<ApplicantAssessComponent>;
        let service: ApplicantAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ApplicantAssessComponent],
                providers: [
                    ApplicantAssessService
                ]
            })
            .overrideTemplate(ApplicantAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicantAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicantAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ApplicantAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.applicants[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
