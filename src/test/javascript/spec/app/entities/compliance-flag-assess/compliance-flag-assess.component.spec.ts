/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceFlagAssessComponent } from '../../../../../../main/webapp/app/entities/compliance-flag-assess/compliance-flag-assess.component';
import { ComplianceFlagAssessService } from '../../../../../../main/webapp/app/entities/compliance-flag-assess/compliance-flag-assess.service';
import { ComplianceFlagAssess } from '../../../../../../main/webapp/app/entities/compliance-flag-assess/compliance-flag-assess.model';

describe('Component Tests', () => {

    describe('ComplianceFlagAssess Management Component', () => {
        let comp: ComplianceFlagAssessComponent;
        let fixture: ComponentFixture<ComplianceFlagAssessComponent>;
        let service: ComplianceFlagAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceFlagAssessComponent],
                providers: [
                    ComplianceFlagAssessService
                ]
            })
            .overrideTemplate(ComplianceFlagAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceFlagAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceFlagAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComplianceFlagAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.complianceFlags[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
