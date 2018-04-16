import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ControlAssess } from './control-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ControlAssess>;

@Injectable()
export class ControlAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/controls';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(control: ControlAssess): Observable<EntityResponseType> {
        const copy = this.convert(control);
        return this.http.post<ControlAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(control: ControlAssess): Observable<EntityResponseType> {
        const copy = this.convert(control);
        return this.http.put<ControlAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ControlAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ControlAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ControlAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ControlAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ControlAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ControlAssess[]>): HttpResponse<ControlAssess[]> {
        const jsonResponse: ControlAssess[] = res.body;
        const body: ControlAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ControlAssess.
     */
    private convertItemFromServer(control: ControlAssess): ControlAssess {
        const copy: ControlAssess = Object.assign({}, control);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(control.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(control.modifiedDate);
        return copy;
    }

    /**
     * Convert a ControlAssess to a JSON which can be sent to the server.
     */
    private convert(control: ControlAssess): ControlAssess {
        const copy: ControlAssess = Object.assign({}, control);

        copy.createdDate = this.dateUtils.toDate(control.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(control.modifiedDate);
        return copy;
    }
}
