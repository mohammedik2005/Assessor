import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ComplianceFlagAssessComponent } from './compliance-flag-assess.component';
import { ComplianceFlagAssessDetailComponent } from './compliance-flag-assess-detail.component';
import { ComplianceFlagAssessPopupComponent } from './compliance-flag-assess-dialog.component';
import { ComplianceFlagAssessDeletePopupComponent } from './compliance-flag-assess-delete-dialog.component';

@Injectable()
export class ComplianceFlagAssessResolvePagingParams implements Resolve<any> {

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

export const complianceFlagRoute: Routes = [
    {
        path: 'compliance-flag-assess',
        component: ComplianceFlagAssessComponent,
        resolve: {
            'pagingParams': ComplianceFlagAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceFlag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'compliance-flag-assess/:id',
        component: ComplianceFlagAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceFlag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const complianceFlagPopupRoute: Routes = [
    {
        path: 'compliance-flag-assess-new',
        component: ComplianceFlagAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceFlag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-flag-assess/:id/edit',
        component: ComplianceFlagAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceFlag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-flag-assess/:id/delete',
        component: ComplianceFlagAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceFlag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
