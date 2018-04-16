/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceScheduleAssessComponent } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess.component';
import { ComplianceScheduleAssessService } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess.service';
import { ComplianceScheduleAssess } from '../../../../../../main/webapp/app/entities/compliance-schedule-assess/compliance-schedule-assess.model';

describe('Component Tests', () => {

    describe('ComplianceScheduleAssess Management Component', () => {
        let comp: ComplianceScheduleAssessComponent;
        let fixture: ComponentFixture<ComplianceScheduleAssessComponent>;
        let service: ComplianceScheduleAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceScheduleAssessComponent],
                providers: [
                    ComplianceScheduleAssessService
                ]
            })
            .overrideTemplate(ComplianceScheduleAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceScheduleAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceScheduleAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComplianceScheduleAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.complianceSchedules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
