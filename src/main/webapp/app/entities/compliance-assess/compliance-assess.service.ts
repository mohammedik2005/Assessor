import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComplianceAssess } from './compliance-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComplianceAssess>;

@Injectable()
export class ComplianceAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/compliances';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(compliance: ComplianceAssess): Observable<EntityResponseType> {
        const copy = this.convert(compliance);
        return this.http.post<ComplianceAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(compliance: ComplianceAssess): Observable<EntityResponseType> {
        const copy = this.convert(compliance);
        return this.http.put<ComplianceAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComplianceAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComplianceAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComplianceAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComplianceAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComplianceAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComplianceAssess[]>): HttpResponse<ComplianceAssess[]> {
        const jsonResponse: ComplianceAssess[] = res.body;
        const body: ComplianceAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComplianceAssess.
     */
    private convertItemFromServer(compliance: ComplianceAssess): ComplianceAssess {
        const copy: ComplianceAssess = Object.assign({}, compliance);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(compliance.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(compliance.modifiedDate);
        return copy;
    }

    /**
     * Convert a ComplianceAssess to a JSON which can be sent to the server.
     */
    private convert(compliance: ComplianceAssess): ComplianceAssess {
        const copy: ComplianceAssess = Object.assign({}, compliance);

        copy.createdDate = this.dateUtils.toDate(compliance.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(compliance.modifiedDate);
        return copy;
    }
}
