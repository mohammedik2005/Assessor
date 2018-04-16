/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceEvidenceStatusAssessComponent } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess.component';
import { ComplianceEvidenceStatusAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess.service';
import { ComplianceEvidenceStatusAssess } from '../../../../../../main/webapp/app/entities/compliance-evidence-status-assess/compliance-evidence-status-assess.model';

describe('Component Tests', () => {

    describe('ComplianceEvidenceStatusAssess Management Component', () => {
        let comp: ComplianceEvidenceStatusAssessComponent;
        let fixture: ComponentFixture<ComplianceEvidenceStatusAssessComponent>;
        let service: ComplianceEvidenceStatusAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceEvidenceStatusAssessComponent],
                providers: [
                    ComplianceEvidenceStatusAssessService
                ]
            })
            .overrideTemplate(ComplianceEvidenceStatusAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceEvidenceStatusAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceEvidenceStatusAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComplianceEvidenceStatusAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.complianceEvidenceStatuses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
