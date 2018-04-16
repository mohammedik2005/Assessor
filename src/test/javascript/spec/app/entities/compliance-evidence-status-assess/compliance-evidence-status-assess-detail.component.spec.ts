/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceEvidenceStatusAssessDetailComponent } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess-detail.component';
import { ComplianceEvidenceStatusAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess.service';
import { ComplianceEvidenceStatusAssess } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess.model';

describe('Component Tests', () => {

    describe('ComplianceEvidenceStatusAssess Management Detail Component', () => {
        let comp: ComplianceEvidenceStatusAssessDetailComponent;
        let fixture: ComponentFixture<ComplianceEvidenceStatusAssessDetailComponent>;
        let service: ComplianceEvidenceStatusAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceEvidenceStatusAssessDetailComponent],
                providers: [
                    ComplianceEvidenceStatusAssessService
                ]
            })
            .overrideTemplate(ComplianceEvidenceStatusAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceEvidenceStatusAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceEvidenceStatusAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComplianceEvidenceStatusAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.complianceEvidenceStatus).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
