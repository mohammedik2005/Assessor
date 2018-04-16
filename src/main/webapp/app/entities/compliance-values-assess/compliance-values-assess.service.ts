import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComplianceValuesAssess } from './compliance-values-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComplianceValuesAssess>;

@Injectable()
export class ComplianceValuesAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/compliance-values';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(complianceValues: ComplianceValuesAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceValues);
        return this.http.post<ComplianceValuesAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(complianceValues: ComplianceValuesAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceValues);
        return this.http.put<ComplianceValuesAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComplianceValuesAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComplianceValuesAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComplianceValuesAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComplianceValuesAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComplianceValuesAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComplianceValuesAssess[]>): HttpResponse<ComplianceValuesAssess[]> {
        const jsonResponse: ComplianceValuesAssess[] = res.body;
        const body: ComplianceValuesAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComplianceValuesAssess.
     */
    private convertItemFromServer(complianceValues: ComplianceValuesAssess): ComplianceValuesAssess {
        const copy: ComplianceValuesAssess = Object.assign({}, complianceValues);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(complianceValues.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(complianceValues.modifiedDate);
        return copy;
    }

    /**
     * Convert a ComplianceValuesAssess to a JSON which can be sent to the server.
     */
    private convert(complianceValues: ComplianceValuesAssess): ComplianceValuesAssess {
        const copy: ComplianceValuesAssess = Object.assign({}, complianceValues);

        copy.createdDate = this.dateUtils.toDate(complianceValues.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(complianceValues.modifiedDate);
        return copy;
    }
}
