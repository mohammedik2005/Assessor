/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ControlCategoryAssessComponent } from '../../../../../../main/webapp/app/entities/control-category-assess/control-category-assess.component';
import { ControlCategoryAssessService } from '../../../../../../main/webapp/app/entities/control-category-assess/control-category-assess.service';
import { ControlCategoryAssess } from '../../../../../../main/webapp/app/entities/control-category-assess/control-category-assess.model';

describe('Component Tests', () => {

    describe('ControlCategoryAssess Management Component', () => {
        let comp: ControlCategoryAssessComponent;
        let fixture: ComponentFixture<ControlCategoryAssessComponent>;
        let service: ControlCategoryAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ControlCategoryAssessComponent],
                providers: [
                    ControlCategoryAssessService
                ]
            })
            .overrideTemplate(ControlCategoryAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ControlCategoryAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ControlCategoryAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ControlCategoryAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.controlCategories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
