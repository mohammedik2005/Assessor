/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ControlPriorityAssessComponent } from '../../../../../../main/webapp/app/entities/control-priority-assess/control-priority-assess.component';
import { ControlPriorityAssessService } from '../../../../../../main/webapp/app/entities/control-priority-assess/control-priority-assess.service';
import { ControlPriorityAssess } from '../../../../../../main/webapp/app/entities/control-priority-assess/control-priority-assess.model';

describe('Component Tests', () => {

    describe('ControlPriorityAssess Management Component', () => {
        let comp: ControlPriorityAssessComponent;
        let fixture: ComponentFixture<ControlPriorityAssessComponent>;
        let service: ControlPriorityAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ControlPriorityAssessComponent],
                providers: [
                    ControlPriorityAssessService
                ]
            })
            .overrideTemplate(ControlPriorityAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ControlPriorityAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ControlPriorityAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ControlPriorityAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.controlPriorities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
