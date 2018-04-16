/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceFlagAssessDetailComponent } from '../../../../../../main/webapp/app/entities/compliance-flag-assess/compliance-flag-assess-detail.component';
import { ComplianceFlagAssessService } from '../../../../../../main/webapp/app/entities/compliance-flag-assess/compliance-flag-assess.service';
import { ComplianceFlagAssess } from '../../../../../../main/webapp/app/entities/compliance-flag-assess/compliance-flag-assess.model';

describe('Component Tests', () => {

    describe('ComplianceFlagAssess Management Detail Component', () => {
        let comp: ComplianceFlagAssessDetailComponent;
        let fixture: ComponentFixture<ComplianceFlagAssessDetailComponent>;
        let service: ComplianceFlagAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceFlagAssessDetailComponent],
                providers: [
                    ComplianceFlagAssessService
                ]
            })
            .overrideTemplate(ComplianceFlagAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceFlagAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceFlagAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComplianceFlagAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.complianceFlag).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
