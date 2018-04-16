import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ControlCategoryAssess } from './control-category-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ControlCategoryAssess>;

@Injectable()
export class ControlCategoryAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/control-categories';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(controlCategory: ControlCategoryAssess): Observable<EntityResponseType> {
        const copy = this.convert(controlCategory);
        return this.http.post<ControlCategoryAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(controlCategory: ControlCategoryAssess): Observable<EntityResponseType> {
        const copy = this.convert(controlCategory);
        return this.http.put<ControlCategoryAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ControlCategoryAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ControlCategoryAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<ControlCategoryAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ControlCategoryAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ControlCategoryAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ControlCategoryAssess[]>): HttpResponse<ControlCategoryAssess[]> {
        const jsonResponse: ControlCategoryAssess[] = res.body;
        const body: ControlCategoryAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ControlCategoryAssess.
     */
    private convertItemFromServer(controlCategory: ControlCategoryAssess): ControlCategoryAssess {
        const copy: ControlCategoryAssess = Object.assign({}, controlCategory);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(controlCategory.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(controlCategory.modifiedDate);
        return copy;
    }

    /**
     * Convert a ControlCategoryAssess to a JSON which can be sent to the server.
     */
    private convert(controlCategory: ControlCategoryAssess): ControlCategoryAssess {
        const copy: ControlCategoryAssess = Object.assign({}, controlCategory);

        copy.createdDate = this.dateUtils.toDate(controlCategory.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(controlCategory.modifiedDate);
        return copy;
    }
}
