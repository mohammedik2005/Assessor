import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComplianceEvidenceStatusAssess } from './compliance-evidence-status-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComplianceEvidenceStatusAssess>;

@Injectable()
export class ComplianceEvidenceStatusAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/compliance-evidence-statuses';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(complianceEvidenceStatus: ComplianceEvidenceStatusAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceEvidenceStatus);
        return this.http.post<ComplianceEvidenceStatusAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(complianceEvidenceStatus: ComplianceEvidenceStatusAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceEvidenceStatus);
        return this.http.put<ComplianceEvidenceStatusAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComplianceEvidenceStatusAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComplianceEvidenceStatusAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComplianceEvidenceStatusAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComplianceEvidenceStatusAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComplianceEvidenceStatusAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComplianceEvidenceStatusAssess[]>): HttpResponse<ComplianceEvidenceStatusAssess[]> {
        const jsonResponse: ComplianceEvidenceStatusAssess[] = res.body;
        const body: ComplianceEvidenceStatusAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComplianceEvidenceStatusAssess.
     */
    private convertItemFromServer(complianceEvidenceStatus: ComplianceEvidenceStatusAssess): ComplianceEvidenceStatusAssess {
        const copy: ComplianceEvidenceStatusAssess = Object.assign({}, complianceEvidenceStatus);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(complianceEvidenceStatus.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(complianceEvidenceStatus.modifiedDate);
        return copy;
    }

    /**
     * Convert a ComplianceEvidenceStatusAssess to a JSON which can be sent to the server.
     */
    private convert(complianceEvidenceStatus: ComplianceEvidenceStatusAssess): ComplianceEvidenceStatusAssess {
        const copy: ComplianceEvidenceStatusAssess = Object.assign({}, complianceEvidenceStatus);

        copy.createdDate = this.dateUtils.toDate(complianceEvidenceStatus.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(complianceEvidenceStatus.modifiedDate);
        return copy;
    }
}
