/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { DomainAssessDetailComponent } from '../../../../../../main/webapp/app/entities/domain-assess/domain-assess-detail.component';
import { DomainAssessService } from '../../../../../../main/webapp/app/entities/domain-assess/domain-assess.service';
import { DomainAssess } from '../../../../../../main/webapp/app/entities/domain-assess/domain-assess.model';

describe('Component Tests', () => {

    describe('DomainAssess Management Detail Component', () => {
        let comp: DomainAssessDetailComponent;
        let fixture: ComponentFixture<DomainAssessDetailComponent>;
        let service: DomainAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [DomainAssessDetailComponent],
                providers: [
                    DomainAssessService
                ]
            })
            .overrideTemplate(DomainAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DomainAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DomainAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DomainAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.domain).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
