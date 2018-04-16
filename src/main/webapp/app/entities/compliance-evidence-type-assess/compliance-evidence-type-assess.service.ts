import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComplianceEvidenceTypeAssess } from './compliance-evidence-type-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComplianceEvidenceTypeAssess>;

@Injectable()
export class ComplianceEvidenceTypeAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/compliance-evidence-types';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(complianceEvidenceType: ComplianceEvidenceTypeAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceEvidenceType);
        return this.http.post<ComplianceEvidenceTypeAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(complianceEvidenceType: ComplianceEvidenceTypeAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceEvidenceType);
        return this.http.put<ComplianceEvidenceTypeAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComplianceEvidenceTypeAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComplianceEvidenceTypeAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComplianceEvidenceTypeAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComplianceEvidenceTypeAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComplianceEvidenceTypeAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComplianceEvidenceTypeAssess[]>): HttpResponse<ComplianceEvidenceTypeAssess[]> {
        const jsonResponse: ComplianceEvidenceTypeAssess[] = res.body;
        const body: ComplianceEvidenceTypeAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComplianceEvidenceTypeAssess.
     */
    private convertItemFromServer(complianceEvidenceType: ComplianceEvidenceTypeAssess): ComplianceEvidenceTypeAssess {
        const copy: ComplianceEvidenceTypeAssess = Object.assign({}, complianceEvidenceType);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(complianceEvidenceType.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(complianceEvidenceType.modifiedDate);
        return copy;
    }

    /**
     * Convert a ComplianceEvidenceTypeAssess to a JSON which can be sent to the server.
     */
    private convert(complianceEvidenceType: ComplianceEvidenceTypeAssess): ComplianceEvidenceTypeAssess {
        const copy: ComplianceEvidenceTypeAssess = Object.assign({}, complianceEvidenceType);

        copy.createdDate = this.dateUtils.toDate(complianceEvidenceType.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(complianceEvidenceType.modifiedDate);
        return copy;
    }
}
