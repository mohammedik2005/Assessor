import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ComplianceEvidenceTypeAssessComponent } from './compliance-evidence-type-assess.component';
import { ComplianceEvidenceTypeAssessDetailComponent } from './compliance-evidence-type-assess-detail.component';
import { ComplianceEvidenceTypeAssessPopupComponent } from './compliance-evidence-type-assess-dialog.component';
import {
    ComplianceEvidenceTypeAssessDeletePopupComponent
} from './compliance-evidence-type-assess-delete-dialog.component';

@Injectable()
export class ComplianceEvidenceTypeAssessResolvePagingParams implements Resolve<any> {

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

export const complianceEvidenceTypeRoute: Routes = [
    {
        path: 'compliance-evidence-type-assess',
        component: ComplianceEvidenceTypeAssessComponent,
        resolve: {
            'pagingParams': ComplianceEvidenceTypeAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'compliance-evidence-type-assess/:id',
        component: ComplianceEvidenceTypeAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const complianceEvidenceTypePopupRoute: Routes = [
    {
        path: 'compliance-evidence-type-assess-new',
        component: ComplianceEvidenceTypeAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-evidence-type-assess/:id/edit',
        component: ComplianceEvidenceTypeAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-evidence-type-assess/:id/delete',
        component: ComplianceEvidenceTypeAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
