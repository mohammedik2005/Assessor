/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { AssessmentScheduleAssessDetailComponent } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess-detail.component';
import { AssessmentScheduleAssessService } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess.service';
import { AssessmentScheduleAssess } from '../../../../../../main/webapp/app/entities/assessment-schedule-assess/assessment-schedule-assess.model';

describe('Component Tests', () => {

    describe('AssessmentScheduleAssess Management Detail Component', () => {
        let comp: AssessmentScheduleAssessDetailComponent;
        let fixture: ComponentFixture<AssessmentScheduleAssessDetailComponent>;
        let service: AssessmentScheduleAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [AssessmentScheduleAssessDetailComponent],
                providers: [
                    AssessmentScheduleAssessService
                ]
            })
            .overrideTemplate(AssessmentScheduleAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssessmentScheduleAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssessmentScheduleAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AssessmentScheduleAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.assessmentSchedule).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
