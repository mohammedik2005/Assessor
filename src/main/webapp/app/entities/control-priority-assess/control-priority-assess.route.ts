import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ControlPriorityAssessComponent } from './control-priority-assess.component';
import { ControlPriorityAssessDetailComponent } from './control-priority-assess-detail.component';
import { ControlPriorityAssessPopupComponent } from './control-priority-assess-dialog.component';
import { ControlPriorityAssessDeletePopupComponent } from './control-priority-assess-delete-dialog.component';

@Injectable()
export class ControlPriorityAssessResolvePagingParams implements Resolve<any> {

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

export const controlPriorityRoute: Routes = [
    {
        path: 'control-priority-assess',
        component: ControlPriorityAssessComponent,
        resolve: {
            'pagingParams': ControlPriorityAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.controlPriority.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'control-priority-assess/:id',
        component: ControlPriorityAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.controlPriority.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const controlPriorityPopupRoute: Routes = [
    {
        path: 'control-priority-assess-new',
        component: ControlPriorityAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.controlPriority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'control-priority-assess/:id/edit',
        component: ControlPriorityAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.controlPriority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'control-priority-assess/:id/delete',
        component: ControlPriorityAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.controlPriority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
