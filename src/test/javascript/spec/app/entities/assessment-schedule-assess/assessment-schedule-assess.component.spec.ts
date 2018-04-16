/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { AssessmentScheduleAssessComponent } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess.component';
import { AssessmentScheduleAssessService } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess.service';
import { AssessmentScheduleAssess } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess.model';

describe('Component Tests', () => {

    describe('AssessmentScheduleAssess Management Component', () => {
        let comp: AssessmentScheduleAssessComponent;
        let fixture: ComponentFixture<AssessmentScheduleAssessComponent>;
        let service: AssessmentScheduleAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [AssessmentScheduleAssessComponent],
                providers: [
                    AssessmentScheduleAssessService
                ]
            })
            .overrideTemplate(AssessmentScheduleAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssessmentScheduleAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssessmentScheduleAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AssessmentScheduleAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.assessmentSchedules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
