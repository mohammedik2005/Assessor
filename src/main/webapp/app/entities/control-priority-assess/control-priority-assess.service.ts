import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ControlPriorityAssess } from './control-priority-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ControlPriorityAssess>;

@Injectable()
export class ControlPriorityAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/control-priorities';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(controlPriority: ControlPriorityAssess): Observable<EntityResponseType> {
        const copy = this.convert(controlPriority);
        return this.http.post<ControlPriorityAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(controlPriority: ControlPriorityAssess): Observable<EntityResponseType> {
        const copy = this.convert(controlPriority);
        return this.http.put<ControlPriorityAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ControlPriorityAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ControlPriorityAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ControlPriorityAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ControlPriorityAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ControlPriorityAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ControlPriorityAssess[]>): HttpResponse<ControlPriorityAssess[]> {
        const jsonResponse: ControlPriorityAssess[] = res.body;
        const body: ControlPriorityAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ControlPriorityAssess.
     */
    private convertItemFromServer(controlPriority: ControlPriorityAssess): ControlPriorityAssess {
        const copy: ControlPriorityAssess = Object.assign({}, controlPriority);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(controlPriority.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(controlPriority.modifiedDate);
        return copy;
    }

    /**
     * Convert a ControlPriorityAssess to a JSON which can be sent to the server.
     */
    private convert(controlPriority: ControlPriorityAssess): ControlPriorityAssess {
        const copy: ControlPriorityAssess = Object.assign({}, controlPriority);

        copy.createdDate = this.dateUtils.toDate(controlPriority.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(controlPriority.modifiedDate);
        return copy;
    }
}
