/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceEvidenceTypeAssessComponent } from '../../../../../../main/webapp/app/entities/compliance-evidence-type-assess/compliance-evidence-type-assess.component';
import { ComplianceEvidenceTypeAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-type-assess/compliance-evidence-type-assess.service';
import { ComplianceEvidenceTypeAssess } from '../../../../../../main/webapp/app/entities/compliance-evidence-type-assess/compliance-evidence-type-assess.model';

describe('Component Tests', () => {

    describe('ComplianceEvidenceTypeAssess Management Component', () => {
        let comp: ComplianceEvidenceTypeAssessComponent;
        let fixture: ComponentFixture<ComplianceEvidenceTypeAssessComponent>;
        let service: ComplianceEvidenceTypeAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceEvidenceTypeAssessComponent],
                providers: [
                    ComplianceEvidenceTypeAssessService
                ]
            })
            .overrideTemplate(ComplianceEvidenceTypeAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceEvidenceTypeAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceEvidenceTypeAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComplianceEvidenceTypeAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.complianceEvidenceTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
