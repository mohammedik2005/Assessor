/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceStatusAssessComponent } from '../../../../../../main/webapp/app/entities/compliance-status-assess/compliance-status-assess.component';
import { ComplianceStatusAssessService } from '../../../../../../main/webapp/app/entities/compliance-status-assess/compliance-status-assess.service';
import { ComplianceStatusAssess } from '../../../../../../main/webapp/app/entities/compliance-status-assess/compliance-status-assess.model';

describe('Component Tests', () => {

    describe('ComplianceStatusAssess Management Component', () => {
        let comp: ComplianceStatusAssessComponent;
        let fixture: ComponentFixture<ComplianceStatusAssessComponent>;
        let service: ComplianceStatusAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceStatusAssessComponent],
                providers: [
                    ComplianceStatusAssessService
                ]
            })
            .overrideTemplate(ComplianceStatusAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceStatusAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceStatusAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComplianceStatusAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.complianceStatuses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
