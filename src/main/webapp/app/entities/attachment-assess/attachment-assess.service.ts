import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AttachmentAssess } from './attachment-assess.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AttachmentAssess>;

@Injectable()
export class AttachmentAssessService {

    private resourceUrl =  SERVER_API_URL + 'api/attachments';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(attachment: AttachmentAssess): Observable<EntityResponseType> {
        const copy = this.convert(attachment);
        return this.http.post<AttachmentAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(attachment: AttachmentAssess): Observable<EntityResponseType> {
        const copy = this.convert(attachment);
        return this.http.put<AttachmentAssess>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AttachmentAssess>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AttachmentAssess[]>> {
        const options = createRequestOption(req);
        return this.http.get<AttachmentAssess[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AttachmentAssess[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AttachmentAssess = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AttachmentAssess[]>): HttpResponse<AttachmentAssess[]> {
        const jsonResponse: AttachmentAssess[] = res.body;
        const body: AttachmentAssess[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AttachmentAssess.
     */
    private convertItemFromServer(attachment: AttachmentAssess): AttachmentAssess {
        const copy: AttachmentAssess = Object.assign({}, attachment);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(attachment.createdDate);
        copy.modifiedDate = this.dateUtils
            .convertDateTimeFromServer(attachment.modifiedDate);
        return copy;
    }

    /**
     * Convert a AttachmentAssess to a JSON which can be sent to the server.
     */
    private convert(attachment: AttachmentAssess): AttachmentAssess {
        const copy: AttachmentAssess = Object.assign({}, attachment);

        copy.createdDate = this.dateUtils.toDate(attachment.createdDate);

        copy.modifiedDate = this.dateUtils.toDate(attachment.modifiedDate);
        return copy;
    }
}
