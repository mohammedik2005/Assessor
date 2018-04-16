import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComplianceStatusAssess } from './compliance-status-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComplianceStatusAssess>;

@Injectable()
export class ComplianceStatusAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/compliance-statuses';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(complianceStatus: ComplianceStatusAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceStatus);
        return this.http.post<ComplianceStatusAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(complianceStatus: ComplianceStatusAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceStatus);
        return this.http.put<ComplianceStatusAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComplianceStatusAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComplianceStatusAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComplianceStatusAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComplianceStatusAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComplianceStatusAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComplianceStatusAssess[]>): HttpResponse<ComplianceStatusAssess[]> {
        const jsonResponse: ComplianceStatusAssess[] = res.body;
        const body: ComplianceStatusAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComplianceStatusAssess.
     */
    private convertItemFromServer(complianceStatus: ComplianceStatusAssess): ComplianceStatusAssess {
        const copy: ComplianceStatusAssess = Object.assign({}, complianceStatus);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(complianceStatus.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(complianceStatus.modifiedDate);
        return copy;
    }

    /**
     * Convert a ComplianceStatusAssess to a JSON which can be sent to the server.
     */
    private convert(complianceStatus: ComplianceStatusAssess): ComplianceStatusAssess {
        const copy: ComplianceStatusAssess = Object.assign({}, complianceStatus);

        copy.createdDate = this.dateUtils.toDate(complianceStatus.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(complianceStatus.modifiedDate);
        return copy;
    }
}
