/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceScheduleAssessDetailComponent } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess-detail.component';
import { ComplianceScheduleAssessService } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess.service';
import { ComplianceScheduleAssess } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess.model';

describe('Component Tests', () => {

    describe('ComplianceScheduleAssess Management Detail Component', () => {
        let comp: ComplianceScheduleAssessDetailComponent;
        let fixture: ComponentFixture<ComplianceScheduleAssessDetailComponent>;
        let service: ComplianceScheduleAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceScheduleAssessDetailComponent],
                providers: [
                    ComplianceScheduleAssessService
                ]
            })
            .overrideTemplate(ComplianceScheduleAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceScheduleAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceScheduleAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComplianceScheduleAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.complianceSchedule).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
