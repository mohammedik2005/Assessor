/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ControlAssessComponent } from '../../../../../../main/webapp/app/entities/control-assess/control-assess.component';
import { ControlAssessService } from '../../../../../../main/webapp/app/entities/control-assess/control-assess.service';
import { ControlAssess } from '../../../../../../main/webapp/app/entities/control-assess/control-assess.model';

describe('Component Tests', () => {

    describe('ControlAssess Management Component', () => {
        let comp: ControlAssessComponent;
        let fixture: ComponentFixture<ControlAssessComponent>;
        let service: ControlAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ControlAssessComponent],
                providers: [
                    ControlAssessService
                ]
            })
            .overrideTemplate(ControlAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ControlAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ControlAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ControlAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.controls[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
