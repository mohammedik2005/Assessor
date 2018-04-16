import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ControlAssessComponent } from './control-assess.component';
import { ControlAssessDetailComponent } from './control-assess-detail.component';
import { ControlAssessPopupComponent } from './control-assess-dialog.component';
import { ControlAssessDeletePopupComponent } from './control-assess-delete-dialog.component';

@Injectable()
export class ControlAssessResolvePagingParams implements Resolve<any> {

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

export const controlRoute: Routes = [
    {
        path: 'control-assess',
        component: ControlAssessComponent,
        resolve: {
            'pagingParams': ControlAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.control.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'control-assess/:id',
        component: ControlAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.control.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const controlPopupRoute: Routes = [
    {
        path: 'control-assess-new',
        component: ControlAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.control.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'control-assess/:id/edit',
        component: ControlAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.control.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'control-assess/:id/delete',
        component: ControlAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.control.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
