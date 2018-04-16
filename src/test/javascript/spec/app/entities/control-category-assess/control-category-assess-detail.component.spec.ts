/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ControlCategoryAssessDetailComponent } from '../../../../../../main/webapp/app/entities/control-category-assess/control-category-assess-detail.component';
import { ControlCategoryAssessService } from '../../../../../../main/webapp/app/entities/control-category-assess/control-category-assess.service';
import { ControlCategoryAssess } from '../../../../../../main/webapp/app/entities/control-category-assess/control-category-assess.model';

describe('Component Tests', () => {

    describe('ControlCategoryAssess Management Detail Component', () => {
        let comp: ControlCategoryAssessDetailComponent;
        let fixture: ComponentFixture<ControlCategoryAssessDetailComponent>;
        let service: ControlCategoryAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ControlCategoryAssessDetailComponent],
                providers: [
                    ControlCategoryAssessService
                ]
            })
            .overrideTemplate(ControlCategoryAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ControlCategoryAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ControlCategoryAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ControlCategoryAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.controlCategory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
