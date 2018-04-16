import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AssessmentScheduleAssessComponent } from './assessment-schedule-assess.component';
import { AssessmentScheduleAssessDetailComponent } from './assessment-schedule-assess-detail.component';
import { AssessmentScheduleAssessPopupComponent } from './assessment-schedule-assess-dialog.component';
import { AssessmentScheduleAssessDeletePopupComponent } from './assessment-schedule-assess-delete-dialog.component';

@Injectable()
export class AssessmentScheduleAssessResolvePagingParams implements Resolve<any> {

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

export const assessmentScheduleRoute: Routes = [
    {
        path: 'assessment-schedule-assess',
        component: AssessmentScheduleAssessComponent,
        resolve: {
            'pagingParams': AssessmentScheduleAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.assessmentSchedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'assessment-schedule-assess/:id',
        component: AssessmentScheduleAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.assessmentSchedule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assessmentSchedulePopupRoute: Routes = [
    {
        path: 'assessment-schedule-assess-new',
        component: AssessmentScheduleAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.assessmentSchedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assessment-schedule-assess/:id/edit',
        component: AssessmentScheduleAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.assessmentSchedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assessment-schedule-assess/:id/delete',
        component: AssessmentScheduleAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.assessmentSchedule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
