/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceAssessDetailComponent } from '../../../../../../main/webapp/app/entities/compliance-assess/compliance-assess-detail.component';
import { ComplianceAssessService } from '../../../../../../main/webapp/app/entities/compliance-assess/compliance-assess.service';
import { ComplianceAssess } from '../../../../../../main/webapp/app/entities/compliance-assess/compliance-assess.model';

describe('Component Tests', () => {

    describe('ComplianceAssess Management Detail Component', () => {
        let comp: ComplianceAssessDetailComponent;
        let fixture: ComponentFixture<ComplianceAssessDetailComponent>;
        let service: ComplianceAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceAssessDetailComponent],
                providers: [
                    ComplianceAssessService
                ]
            })
            .overrideTemplate(ComplianceAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComplianceAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.compliance).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
