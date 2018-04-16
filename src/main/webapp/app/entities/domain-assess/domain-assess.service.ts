import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DomainAssess } from './domain-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DomainAssess>;

@Injectable()
export class DomainAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/domains';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(domain: DomainAssess): Observable<EntityResponseType> {
        const copy = this.convert(domain);
        return this.http.post<DomainAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(domain: DomainAssess): Observable<EntityResponseType> {
        const copy = this.convert(domain);
        return this.http.put<DomainAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DomainAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DomainAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<DomainAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DomainAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DomainAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DomainAssess[]>): HttpResponse<DomainAssess[]> {
        const jsonResponse: DomainAssess[] = res.body;
        const body: DomainAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DomainAssess.
     */
    private convertItemFromServer(domain: DomainAssess): DomainAssess {
        const copy: DomainAssess = Object.assign({}, domain);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(domain.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(domain.modifiedDate);
        return copy;
    }

    /**
     * Convert a DomainAssess to a JSON which can be sent to the server.
     */
    private convert(domain: DomainAssess): DomainAssess {
        const copy: DomainAssess = Object.assign({}, domain);

        copy.createdDate = this.dateUtils.toDate(domain.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(domain.modifiedDate);
        return copy;
    }
}
