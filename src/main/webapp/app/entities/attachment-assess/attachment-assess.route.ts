import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AttachmentAssessComponent } from './attachment-assess.component';
import { AttachmentAssessDetailComponent } from './attachment-assess-detail.component';
import { AttachmentAssessPopupComponent } from './attachment-assess-dialog.component';
import { AttachmentAssessDeletePopupComponent } from './attachment-assess-delete-dialog.component';

@Injectable()
export class AttachmentAssessResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const attachmentRoute: Routes = [
    {
        path: 'attachment-assess',
        component: AttachmentAssessComponent,
        resolve: {
            'pagingParams': AttachmentAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.attachment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'attachment-assess/:id',
        component: AttachmentAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.attachment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const attachmentPopupRoute: Routes = [
    {
        path: 'attachment-assess-new',
        component: AttachmentAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.attachment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'attachment-assess/:id/edit',
        component: AttachmentAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.attachment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'attachment-assess/:id/delete',
        component: AttachmentAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.attachment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
