/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceEvidenceNoteAssessDetailComponent } from '../../../../../../main/webapp/app/entities/compliance-evidence-note-assess/compliance-evidence-note-assess-detail.component';
import { ComplianceEvidenceNoteAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-note-assess/compliance-evidence-note-assess.service';
import { ComplianceEvidenceNoteAssess } from '../../../../../../main/webapp/app/entities/compliance-evidence-note-assess/compliance-evidence-note-assess.model';

describe('Component Tests', () => {

    describe('ComplianceEvidenceNoteAssess Management Detail Component', () => {
        let comp: ComplianceEvidenceNoteAssessDetailComponent;
        let fixture: ComponentFixture<ComplianceEvidenceNoteAssessDetailComponent>;
        let service: ComplianceEvidenceNoteAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceEvidenceNoteAssessDetailComponent],
                providers: [
                    ComplianceEvidenceNoteAssessService
                ]
            })
            .overrideTemplate(ComplianceEvidenceNoteAssessDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceEvidenceNoteAssessDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceEvidenceNoteAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ComplianceEvidenceNoteAssess(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.complianceEvidenceNote).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
