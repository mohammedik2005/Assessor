import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ComplianceEvidenceNoteAssess } from './compliance-evidence-note-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComplianceEvidenceNoteAssess>;

@Injectable()
export class ComplianceEvidenceNoteAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/compliance-evidence-notes';

    constructor(private http: HttpClient) { }

    create(complianceEvidenceNote: ComplianceEvidenceNoteAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceEvidenceNote);
        return this.http.post<ComplianceEvidenceNoteAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(complianceEvidenceNote: ComplianceEvidenceNoteAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceEvidenceNote);
        return this.http.put<ComplianceEvidenceNoteAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComplianceEvidenceNoteAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComplianceEvidenceNoteAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComplianceEvidenceNoteAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComplianceEvidenceNoteAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComplianceEvidenceNoteAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComplianceEvidenceNoteAssess[]>): HttpResponse<ComplianceEvidenceNoteAssess[]> {
        const jsonResponse: ComplianceEvidenceNoteAssess[] = res.body;
        const body: ComplianceEvidenceNoteAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComplianceEvidenceNoteAssess.
     */
    private convertItemFromServer(complianceEvidenceNote: ComplianceEvidenceNoteAssess): ComplianceEvidenceNoteAssess {
        const copy: ComplianceEvidenceNoteAssess = Object.assign({}, complianceEvidenceNote);
        return copy;
    }

    /**
     * Convert a ComplianceEvidenceNoteAssess to a JSON which can be sent to the server.
     */
    private convert(complianceEvidenceNote: ComplianceEvidenceNoteAssess): ComplianceEvidenceNoteAssess {
        const copy: ComplianceEvidenceNoteAssess = Object.assign({}, complianceEvidenceNote);
        return copy;
    }
}
