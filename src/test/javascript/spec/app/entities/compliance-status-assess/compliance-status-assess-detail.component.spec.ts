/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceStatusAssessDetailComponent } from '../../../../../../main/webapp/app/entities/compliance-status-assess/compliance-status-assess-detail.component';
import { ComplianceStatusAssessService } from '../../../../../../main/webapp/app/entities/compliance-status-assess/compliance-status-assess.service';
import { ComplianceStatusAssess } from '../../../../../../main/webapp/app/entities/compliance-status-assess/compliance-status-assess.model';

describe('Component Tests', () => {

    describe('ComplianceStatusAssess Management Detail Component', () => {
        let comp: ComplianceStatusAssessDetailComponent;
        let fixture: ComponentFixture<ComplianceStatusAssessDetailComponent>;
        let service: ComplianceStatusAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceStatusAssessDetailComponent],
                providers: [
                    ComplianceStatusAssessService
                ]
            })
            .overrideTemplate(ComplianceStatusAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceStatusAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceStatusAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComplianceStatusAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.complianceStatus).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
