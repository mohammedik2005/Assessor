import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ComplianceStatusAssessComponent } from './compliance-status-assess.component';
import { ComplianceStatusAssessDetailComponent } from './compliance-status-assess-detail.component';
import { ComplianceStatusAssessPopupComponent } from './compliance-status-assess-dialog.component';
import { ComplianceStatusAssessDeletePopupComponent } from './compliance-status-assess-delete-dialog.component';

@Injectable()
export class ComplianceStatusAssessResolvePagingParams implements Resolve<any> {

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

export const complianceStatusRoute: Routes = [
    {
        path: 'compliance-status-assess',
        component: ComplianceStatusAssessComponent,
        resolve: {
            'pagingParams': ComplianceStatusAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'compliance-status-assess/:id',
        component: ComplianceStatusAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const complianceStatusPopupRoute: Routes = [
    {
        path: 'compliance-status-assess-new',
        component: ComplianceStatusAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-status-assess/:id/edit',
        component: ComplianceStatusAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-status-assess/:id/delete',
        component: ComplianceStatusAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
