import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComplianceFlagAssess } from './compliance-flag-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComplianceFlagAssess>;

@Injectable()
export class ComplianceFlagAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/compliance-flags';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(complianceFlag: ComplianceFlagAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceFlag);
        return this.http.post<ComplianceFlagAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(complianceFlag: ComplianceFlagAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceFlag);
        return this.http.put<ComplianceFlagAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComplianceFlagAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComplianceFlagAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComplianceFlagAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComplianceFlagAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComplianceFlagAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComplianceFlagAssess[]>): HttpResponse<ComplianceFlagAssess[]> {
        const jsonResponse: ComplianceFlagAssess[] = res.body;
        const body: ComplianceFlagAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComplianceFlagAssess.
     */
    private convertItemFromServer(complianceFlag: ComplianceFlagAssess): ComplianceFlagAssess {
        const copy: ComplianceFlagAssess = Object.assign({}, complianceFlag);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(complianceFlag.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(complianceFlag.modifiedDate);
        return copy;
    }

    /**
     * Convert a ComplianceFlagAssess to a JSON which can be sent to the server.
     */
    private convert(complianceFlag: ComplianceFlagAssess): ComplianceFlagAssess {
        const copy: ComplianceFlagAssess = Object.assign({}, complianceFlag);

        copy.createdDate = this.dateUtils.toDate(complianceFlag.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(complianceFlag.modifiedDate);
        return copy;
    }
}
