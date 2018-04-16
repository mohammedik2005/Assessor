import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ComplianceEvidenceNoteAssessComponent } from './compliance-evidence-note-assess.component';
import { ComplianceEvidenceNoteAssessDetailComponent } from './compliance-evidence-note-assess-detail.component';
import { ComplianceEvidenceNoteAssessPopupComponent } from './compliance-evidence-note-assess-dialog.component';
import {
    ComplianceEvidenceNoteAssessDeletePopupComponent
} from './compliance-evidence-note-assess-delete-dialog.component';

@Injectable()
export class ComplianceEvidenceNoteAssessResolvePagingParams implements Resolve<any> {

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

export const complianceEvidenceNoteRoute: Routes = [
    {
        path: 'compliance-evidence-note-assess',
        component: ComplianceEvidenceNoteAssessComponent,
        resolve: {
            'pagingParams': ComplianceEvidenceNoteAssessResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceNote.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'compliance-evidence-note-assess/:id',
        component: ComplianceEvidenceNoteAssessDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceNote.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const complianceEvidenceNotePopupRoute: Routes = [
    {
        path: 'compliance-evidence-note-assess-new',
        component: ComplianceEvidenceNoteAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceNote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-evidence-note-assess/:id/edit',
        component: ComplianceEvidenceNoteAssessPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceNote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'compliance-evidence-note-assess/:id/delete',
        component: ComplianceEvidenceNoteAssessDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'assessorApp.complianceEvidenceNote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
