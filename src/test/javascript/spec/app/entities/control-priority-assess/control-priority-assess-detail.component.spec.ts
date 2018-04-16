/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ControlPriorityAssessDetailComponent } from '../../../../../../main/webapp/app/entities/control-priority-assess/control-priority-assess-detail.component';
import { ControlPriorityAssessService } from '../../../../../../main/webapp/app/entities/control-priority-assess/control-priority-assess.service';
import { ControlPriorityAssess } from '../../../../../../main/webapp/app/entities/control-priority-assess/control-priority-assess.model';

describe('Component Tests', () => {

    describe('ControlPriorityAssess Management Detail Component', () => {
        let comp: ControlPriorityAssessDetailComponent;
        let fixture: ComponentFixture<ControlPriorityAssessDetailComponent>;
        let service: ControlPriorityAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ControlPriorityAssessDetailComponent],
                providers: [
                    ControlPriorityAssessService
                ]
            })
            .overrideTemplate(ControlPriorityAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ControlPriorityAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ControlPriorityAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ControlPriorityAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.controlPriority).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
