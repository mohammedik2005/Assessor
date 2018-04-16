import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PrinciplesAssess } from './principles-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PrinciplesAssess>;

@Injectable()
export class PrinciplesAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/principles';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(principles: PrinciplesAssess): Observable<EntityResponseType> {
        const copy = this.convert(principles);
        return this.http.post<PrinciplesAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(principles: PrinciplesAssess): Observable<EntityResponseType> {
        const copy = this.convert(principles);
        return this.http.put<PrinciplesAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PrinciplesAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PrinciplesAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<PrinciplesAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PrinciplesAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PrinciplesAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PrinciplesAssess[]>): HttpResponse<PrinciplesAssess[]> {
        const jsonResponse: PrinciplesAssess[] = res.body;
        const body: PrinciplesAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PrinciplesAssess.
     */
    private convertItemFromServer(principles: PrinciplesAssess): PrinciplesAssess {
        const copy: PrinciplesAssess = Object.assign({}, principles);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(principles.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(principles.modifiedDate);
        return copy;
    }

    /**
     * Convert a PrinciplesAssess to a JSON which can be sent to the server.
     */
    private convert(principles: PrinciplesAssess): PrinciplesAssess {
        const copy: PrinciplesAssess = Object.assign({}, principles);

        copy.createdDate = this.dateUtils.toDate(principles.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(principles.modifiedDate);
        return copy;
    }
}
