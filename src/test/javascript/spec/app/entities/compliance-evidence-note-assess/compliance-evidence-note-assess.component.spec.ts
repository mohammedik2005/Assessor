/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AssessorTestModule } from '../../../test.module';
import { ComplianceEvidenceNoteAssessComponent } from '../../../../../../main/webapp/app/entities/compliance-evidence-note-assess/compliance-evidence-note-assess.component';
import { ComplianceEvidenceNoteAssessService } from '../../../../../../main/webapp/app/entities/compliance-evidence-note-assess/compliance-evidence-note-assess.service';
import { ComplianceEvidenceNoteAssess } from '../../../../../../main/webapp/app/entities/compliance-evidence-note-assess/compliance-evidence-note-assess.model';

describe('Component Tests', () => {

    describe('ComplianceEvidenceNoteAssess Management Component', () => {
        let comp: ComplianceEvidenceNoteAssessComponent;
        let fixture: ComponentFixture<ComplianceEvidenceNoteAssessComponent>;
        let service: ComplianceEvidenceNoteAssessService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AssessorTestModule],
                declarations: [ComplianceEvidenceNoteAssessComponent],
                providers: [
                    ComplianceEvidenceNoteAssessService
                ]
            })
            .overrideTemplate(ComplianceEvidenceNoteAssessComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComplianceEvidenceNoteAssessComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComplianceEvidenceNoteAssessService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ComplianceEvidenceNoteAssess(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.complianceEvidenceNotes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
