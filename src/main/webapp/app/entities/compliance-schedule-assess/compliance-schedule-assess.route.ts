import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ComplianceScheduleAssessComponent } from './compliance-schedule-assess.component';
import { ComplianceScheduleAssessDetailComponent } from './compliance-schedule-assess-detail.component';
import { ComplianceScheduleAssessPopupComponent } from './compliance-schedule-assess-dialog.component';
import { ComplianceScheduleAssessDeletePopupComponent } from './compliance-schedule-assess-delete-dialog.component';

@Injectable()
export class ComplianceScheduleAssessResolvePagingParams implements Resolve<any> {

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

export const complianceScheduleRoute: Routes = [
    {
        path: 'compliance-schedule-assess',
        component: ComplianceScheduleAssessComponent,
        resolve: {
            'pagingParams': ComplianceScheduleAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceSchedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'compliance-schedule-assess/:id',
        component: ComplianceScheduleAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceSchedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const complianceSchedulePopupRoute: Routes = [
    {
        path: 'compliance-schedule-assess-new',
        component: ComplianceScheduleAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceSchedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-schedule-assess/:id/edit',
        component: ComplianceScheduleAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceSchedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-schedule-assess/:id/delete',
        component: ComplianceScheduleAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceSchedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
