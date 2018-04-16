import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ComplianceScheduleAssess } from './compliance-schedule-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ComplianceScheduleAssess>;

@Injectable()
export class ComplianceScheduleAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/compliance-schedules';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(complianceSchedule: ComplianceScheduleAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceSchedule);
        return this.http.post<ComplianceScheduleAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(complianceSchedule: ComplianceScheduleAssess): Observable<EntityResponseType> {
        const copy = this.convert(complianceSchedule);
        return this.http.put<ComplianceScheduleAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ComplianceScheduleAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ComplianceScheduleAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ComplianceScheduleAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ComplianceScheduleAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ComplianceScheduleAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ComplianceScheduleAssess[]>): HttpResponse<ComplianceScheduleAssess[]> {
        const jsonResponse: ComplianceScheduleAssess[] = res.body;
        const body: ComplianceScheduleAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ComplianceScheduleAssess.
     */
    private convertItemFromServer(complianceSchedule: ComplianceScheduleAssess): ComplianceScheduleAssess {
        const copy: ComplianceScheduleAssess = Object.assign({}, complianceSchedule);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(complianceSchedule.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(complianceSchedule.modifiedDate);
        return copy;
    }

    /**
     * Convert a ComplianceScheduleAssess to a JSON which can be sent to the server.
     */
    private convert(complianceSchedule: ComplianceScheduleAssess): ComplianceScheduleAssess {
        const copy: ComplianceScheduleAssess = Object.assign({}, complianceSchedule);

        copy.createdDate = this.dateUtils.toDate(complianceSchedule.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(complianceSchedule.modifiedDate);
        return copy;
    }
}
