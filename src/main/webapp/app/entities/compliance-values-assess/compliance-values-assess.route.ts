import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ComplianceValuesAssessComponent } from './compliance-values-assess.component';
import { ComplianceValuesAssessDetailComponent } from './compliance-values-assess-detail.component';
import { ComplianceValuesAssessPopupComponent } from './compliance-values-assess-dialog.component';
import { ComplianceValuesAssessDeletePopupComponent } from './compliance-values-assess-delete-dialog.component';

@Injectable()
export class ComplianceValuesAssessResolvePagingParams implements Resolve<any> {

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

export const complianceValuesRoute: Routes = [
    {
        path: 'compliance-values-assess',
        component: ComplianceValuesAssessComponent,
        resolve: {
            'pagingParams': ComplianceValuesAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceValues.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'compliance-values-assess/:id',
        component: ComplianceValuesAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceValues.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const complianceValuesPopupRoute: Routes = [
    {
        path: 'compliance-values-assess-new',
        component: ComplianceValuesAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceValues.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-values-assess/:id/edit',
        component: ComplianceValuesAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceValues.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-values-assess/:id/delete',
        component: ComplianceValuesAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceValues.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
