import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ApplicantAssessComponent } from './applicant-assess.component';
import { ApplicantAssessDetailComponent } from './applicant-assess-detail.component';
import { ApplicantAssessPopupComponent } from './applicant-assess-dialog.component';
import { ApplicantAssessDeletePopupComponent } from './applicant-assess-delete-dialog.component';

@Injectable()
export class ApplicantAssessResolvePagingParams implements Resolve<any> {

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

export const applicantRoute: Routes = [
    {
        path: 'applicant-assess',
        component: ApplicantAssessComponent,
        resolve: {
            'pagingParams': ApplicantAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.applicant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'applicant-assess/:id',
        component: ApplicantAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.applicant.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const applicantPopupRoute: Routes = [
    {
        path: 'applicant-assess-new',
        component: ApplicantAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.applicant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'applicant-assess/:id/edit',
        component: ApplicantAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.applicant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'applicant-assess/:id/delete',
        component: ApplicantAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.applicant.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
