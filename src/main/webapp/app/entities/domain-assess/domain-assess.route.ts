import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DomainAssessComponent } from './domain-assess.component';
import { DomainAssessDetailComponent } from './domain-assess-detail.component';
import { DomainAssessPopupComponent } from './domain-assess-dialog.component';
import { DomainAssessDeletePopupComponent } from './domain-assess-delete-dialog.component';

@Injectable()
export class DomainAssessResolvePagingParams implements Resolve<any> {

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

export const domainRoute: Routes = [
    {
        path: 'domain-assess',
        component: DomainAssessComponent,
        resolve: {
            'pagingParams': DomainAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.domain.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'domain-assess/:id',
        component: DomainAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.domain.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const domainPopupRoute: Routes = [
    {
        path: 'domain-assess-new',
        component: DomainAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.domain.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'domain-assess/:id/edit',
        component: DomainAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.domain.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'domain-assess/:id/delete',
        component: DomainAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.domain.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
