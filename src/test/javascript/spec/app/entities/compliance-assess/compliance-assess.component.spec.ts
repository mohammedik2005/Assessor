/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceAssessComponent } from '../../../../../../main/webapp/app/entities/compliance-assess/compliance-assess.component';
import { ComplianceAssessService } from '../../../../../../main/webapp/app/entities/compliance-assess/compliance-assess.service';
import { ComplianceAssess } from '../../../../../../main/webapp/app/entities/compliance-assess/compliance-assess.model';

describe('Component Tests', () => {

    describe('ComplianceAssess Management Component', () => {
        let comp: ComplianceAssessComponent;
        let fixture: ComponentFixture<ComplianceAssessComponent>;
        let service: ComplianceAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceAssessComponent],
                providers: [
                    ComplianceAssessService
                ]
            })
            .overrideTemplate(ComplianceAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComplianceAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.compliances[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
