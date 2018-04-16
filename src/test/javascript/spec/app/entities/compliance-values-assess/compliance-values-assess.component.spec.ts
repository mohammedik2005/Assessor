/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceValuesAssessComponent } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess.component';
import { ComplianceValuesAssessService } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess.service';
import { ComplianceValuesAssess } from '../../../../../../main/webapp/app/entities/compliance-values-assess/compliance-values-assess.model';

describe('Component Tests', () => {

    describe('ComplianceValuesAssess Management Component', () => {
        let comp: ComplianceValuesAssessComponent;
        let fixture: ComponentFixture<ComplianceValuesAssessComponent>;
        let service: ComplianceValuesAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceValuesAssessComponent],
                providers: [
                    ComplianceValuesAssessService
                ]
            })
            .overrideTemplate(ComplianceValuesAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceValuesAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceValuesAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComplianceValuesAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.complianceValues[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
