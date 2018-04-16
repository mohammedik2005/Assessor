/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ApplicantAssessDetailComponent } from '../../../../../../main/webapp/app/entities/applicant-assess/applicant-assess-detail.component';
import { ApplicantAssessService } from '../../../../../../main/webapp/app/entities/applicant-assess/applicant-assess.service';
import { ApplicantAssess } from '../../../../../../main/webapp/app/entities/applicant-assess/applicant-assess.model';

describe('Component Tests', () => {

    describe('ApplicantAssess Management Detail Component', () => {
        let comp: ApplicantAssessDetailComponent;
        let fixture: ComponentFixture<ApplicantAssessDetailComponent>;
        let service: ApplicantAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ApplicantAssessDetailComponent],
                providers: [
                    ApplicantAssessService
                ]
            })
            .overrideTemplate(ApplicantAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ApplicantAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicantAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ApplicantAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.applicant).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
