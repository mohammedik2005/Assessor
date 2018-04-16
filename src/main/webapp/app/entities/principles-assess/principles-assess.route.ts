import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PrinciplesAssessComponent } from './principles-assess.component';
import { PrinciplesAssessDetailComponent } from './principles-assess-detail.component';
import { PrinciplesAssessPopupComponent } from './principles-assess-dialog.component';
import { PrinciplesAssessDeletePopupComponent } from './principles-assess-delete-dialog.component';

@Injectable()
export class PrinciplesAssessResolvePagingParams implements Resolve<any> {

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

export const principlesRoute: Routes = [
    {
        path: 'principles-assess',
        component: PrinciplesAssessComponent,
        resolve: {
            'pagingParams': PrinciplesAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.principles.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'principles-assess/:id',
        component: PrinciplesAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.principles.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const principlesPopupRoute: Routes = [
    {
        path: 'principles-assess-new',
        component: PrinciplesAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.principles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'principles-assess/:id/edit',
        component: PrinciplesAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.principles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'principles-assess/:id/delete',
        component: PrinciplesAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.principles.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
