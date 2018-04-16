import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ControlCategoryAssessComponent } from './control-category-assess.component';
import { ControlCategoryAssessDetailComponent } from './control-category-assess-detail.component';
import { ControlCategoryAssessPopupComponent } from './control-category-assess-dialog.component';
import { ControlCategoryAssessDeletePopupComponent } from './control-category-assess-delete-dialog.component';

@Injectable()
export class ControlCategoryAssessResolvePagingParams implements Resolve<any> {

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

export const controlCategoryRoute: Routes = [
    {
        path: 'control-category-assess',
        component: ControlCategoryAssessComponent,
        resolve: {
            'pagingParams': ControlCategoryAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.controlCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'control-category-assess/:id',
        component: ControlCategoryAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.controlCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const controlCategoryPopupRoute: Routes = [
    {
        path: 'control-category-assess-new',
        component: ControlCategoryAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.controlCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'control-category-assess/:id/edit',
        component: ControlCategoryAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.controlCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'control-category-assess/:id/delete',
        component: ControlCategoryAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.controlCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
