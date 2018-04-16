/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ControlAssessDetailComponent } from '../../../../../../main/webapp/app/entities/control-assess/control-assess-detail.component';
import { ControlAssessService } from '../../../../../../main/webapp/app/entities/control-assess/control-assess.service';
import { ControlAssess } from '../../../../../../main/webapp/app/entities/control-assess/control-assess.model';

describe('Component Tests', () => {

    describe('ControlAssess Management Detail Component', () => {
        let comp: ControlAssessDetailComponent;
        let fixture: ComponentFixture<ControlAssessDetailComponent>;
        let service: ControlAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ControlAssessDetailComponent],
                providers: [
                    ControlAssessService
                ]
            })
            .overrideTemplate(ControlAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ControlAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ControlAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ControlAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.control).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
