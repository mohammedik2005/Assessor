import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ComplianceAssessComponent } from './compliance-assess.component';
import { ComplianceAssessDetailComponent } from './compliance-assess-detail.component';
import { ComplianceAssessPopupComponent } from './compliance-assess-dialog.component';
import { ComplianceAssessDeletePopupComponent } from './compliance-assess-delete-dialog.component';

@Injectable()
export class ComplianceAssessResolvePagingParams implements Resolve<any> {

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

export const complianceRoute: Routes = [
    {
        path: 'compliance-assess',
        component: ComplianceAssessComponent,
        resolve: {
            'pagingParams': ComplianceAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.compliance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'compliance-assess/:id',
        component: ComplianceAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.compliance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const compliancePopupRoute: Routes = [
    {
        path: 'compliance-assess-new',
        component: ComplianceAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.compliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-assess/:id/edit',
        component: ComplianceAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.compliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-assess/:id/delete',
        component: ComplianceAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.compliance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
