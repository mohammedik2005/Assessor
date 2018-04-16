/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceEvidenceTypeAssessDetailComponent } from '../../../../../../main/webapp/app/entities/compliance-evidence-type-assess/compliance-evidence-type-assess-detail.component';
import { ComplianceEvidenceTypeAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-type-assess/compliance-evidence-type-assess.service';
import { ComplianceEvidenceTypeAssess } from '../../../../../../main/webapp/app/entities/compliance-evidence-type-assess/compliance-evidence-type-assess.model';

describe('Component Tests', () => {

    describe('ComplianceEvidenceTypeAssess Management Detail Component', () => {
        let comp: ComplianceEvidenceTypeAssessDetailComponent;
        let fixture: ComponentFixture<ComplianceEvidenceTypeAssessDetailComponent>;
        let service: ComplianceEvidenceTypeAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceEvidenceTypeAssessDetailComponent],
                providers: [
                    ComplianceEvidenceTypeAssessService
                ]
            })
            .overrideTemplate(ComplianceEvidenceTypeAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceEvidenceTypeAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceEvidenceTypeAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComplianceEvidenceTypeAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.complianceEvidenceType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
