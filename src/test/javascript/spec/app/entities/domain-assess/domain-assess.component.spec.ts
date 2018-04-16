/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { DomainAssessComponent } from '../../../../../../main/webapp/app/entities/domain-assess/domain-assess.component';
import { DomainAssessService } from '../../../../../../main/webapp/app/entities/domain-assess/domain-assess.service';
import { DomainAssess } from '../../../../../../main/webapp/app/entities/domain-assess/domain-assess.model';

describe('Component Tests', () => {

    describe('DomainAssess Management Component', () => {
        let comp: DomainAssessComponent;
        let fixture: ComponentFixture<DomainAssessComponent>;
        let service: DomainAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [DomainAssessComponent],
                providers: [
                    DomainAssessService
                ]
            })
            .overrideTemplate(DomainAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DomainAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DomainAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DomainAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.domains[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
