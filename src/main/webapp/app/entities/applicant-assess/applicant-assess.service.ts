import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ApplicantAssess } from './applicant-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ApplicantAssess>;

@Injectable()
export class ApplicantAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/applicants';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(applicant: ApplicantAssess): Observable<EntityResponseType> {
        const copy = this.convert(applicant);
        return this.http.post<ApplicantAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(applicant: ApplicantAssess): Observable<EntityResponseType> {
        const copy = this.convert(applicant);
        return this.http.put<ApplicantAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ApplicantAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ApplicantAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ApplicantAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ApplicantAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ApplicantAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ApplicantAssess[]>): HttpResponse<ApplicantAssess[]> {
        const jsonResponse: ApplicantAssess[] = res.body;
        const body: ApplicantAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ApplicantAssess.
     */
    private convertItemFromServer(applicant: ApplicantAssess): ApplicantAssess {
        const copy: ApplicantAssess = Object.assign({}, applicant);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(applicant.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(applicant.modifiedDate);
        return copy;
    }

    /**
     * Convert a ApplicantAssess to a JSON which can be sent to the server.
     */
    private convert(applicant: ApplicantAssess): ApplicantAssess {
        const copy: ApplicantAssess = Object.assign({}, applicant);

        copy.createdDate = this.dateUtils.toDate(applicant.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(applicant.modifiedDate);
        return copy;
    }
}
