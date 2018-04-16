import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AssessmentScheduleAssess } from './assessment-schedule-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AssessmentScheduleAssess>;

@Injectable()
export class AssessmentScheduleAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/assessment-schedules';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(assessmentSchedule: AssessmentScheduleAssess): Observable<EntityResponseType> {
        const copy = this.convert(assessmentSchedule);
        return this.http.post<AssessmentScheduleAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(assessmentSchedule: AssessmentScheduleAssess): Observable<EntityResponseType> {
        const copy = this.convert(assessmentSchedule);
        return this.http.put<AssessmentScheduleAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AssessmentScheduleAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AssessmentScheduleAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<AssessmentScheduleAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AssessmentScheduleAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AssessmentScheduleAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AssessmentScheduleAssess[]>): HttpResponse<AssessmentScheduleAssess[]> {
        const jsonResponse: AssessmentScheduleAssess[] = res.body;
        const body: AssessmentScheduleAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AssessmentScheduleAssess.
     */
    private convertItemFromServer(assessmentSchedule: AssessmentScheduleAssess): AssessmentScheduleAssess {
        const copy: AssessmentScheduleAssess = Object.assign({}, assessmentSchedule);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(assessmentSchedule.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(assessmentSchedule.toDate);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(assessmentSchedule.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(assessmentSchedule.modifiedDate);
        return copy;
    }

    /**
     * Convert a AssessmentScheduleAssess to a JSON which can be sent to the server.
     */
    private convert(assessmentSchedule: AssessmentScheduleAssess): AssessmentScheduleAssess {
        const copy: AssessmentScheduleAssess = Object.assign({}, assessmentSchedule);

        copy.fromDate = this.dateUtils.toDate(assessmentSchedule.fromDate);

        copy.toDate = this.dateUtils.toDate(assessmentSchedule.toDate);

        copy.createdDate = this.dateUtils.toDate(assessmentSchedule.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(assessmentSchedule.modifiedDate);
        return copy;
    }
}
