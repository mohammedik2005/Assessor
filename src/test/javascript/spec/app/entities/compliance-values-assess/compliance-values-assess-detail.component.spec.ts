/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceValuesAssessDetailComponent } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess-detail.component';
import { ComplianceValuesAssessService } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess.service';
import { ComplianceValuesAssess } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess.model';

describe('Component Tests', () => {

    describe('ComplianceValuesAssess Management Detail Component', () => {
        let comp: ComplianceValuesAssessDetailComponent;
        let fixture: ComponentFixture<ComplianceValuesAssessDetailComponent>;
        let service: ComplianceValuesAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceValuesAssessDetailComponent],
                providers: [
                    ComplianceValuesAssessService
                ]
            })
            .overrideTemplate(ComplianceValuesAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceValuesAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceValuesAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComplianceValuesAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.complianceValues).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
