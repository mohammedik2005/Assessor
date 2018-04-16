import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ComplianceEvidenceStatusAssessComponent } from './compliance-evidence-status-assess.component';
import { ComplianceEvidenceStatusAssessDetailComponent } from './compliance-evidence-status-assess-detail.component';
import { ComplianceEvidenceStatusAssessPopupComponent } from './compliance-evidence-status-assess-dialog.component';
import {
    ComplianceEvidenceStatusAssessDeletePopupComponent
} from './compliance-evidence-status-assess-delete-dialog.component';

@Injectable()
export class ComplianceEvidenceStatusAssessResolvePagingParams implements Resolve<any> {

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

export const complianceEvidenceStatusRoute: Routes = [
    {
        path: 'compliance-evidence-status-assess',
        component: ComplianceEvidenceStatusAssessComponent,
        resolve: {
            'pagingParams': ComplianceEvidenceStatusAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'compliance-evidence-status-assess/:id',
        component: ComplianceEvidenceStatusAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceStatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const complianceEvidenceStatusPopupRoute: Routes = [
    {
        path: 'compliance-evidence-status-assess-new',
        component: ComplianceEvidenceStatusAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-evidence-status-assess/:id/edit',
        component: ComplianceEvidenceStatusAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-evidence-status-assess/:id/delete',
        component: ComplianceEvidenceStatusAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceStatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
