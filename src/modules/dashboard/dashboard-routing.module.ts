/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { DashboardModule } from './dashboard.module';

/* Containers */
import * as dashboardContainers from './containers';
import * as styleReferenceContainers from '@modules/style-reference/containers';

/* Guards */
import * as dashboardGuards from './guards';

import { styleReferenceRouteVariables } from '@modules/style-reference/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: dashboardContainers.DashboardComponent,
        children: [
            {
                path: '',
                data: {
                    title: 'Dashboard - SB Admin Pro Angular',
                    breadcrumbs: [
                        {
                            text: 'Dashboard',
                            active: true,
                        },
                    ],
                } as SBRouteData,
                component: dashboardContainers.DashboardOverviewComponent,
            },
            {
                path: 'components',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'alerts',
                    },
                    ...styleReferenceRouteVariables.components.map(value => ({
                        path: value.name,
                        data: {
                            title: `${value.title} - SB Admin Pro Angular`,
                            breadcrumbs: [
                                {
                                    text: 'Dashboard',
                                    link: '/dashboard',
                                },
                                {
                                    text: value.title,
                                    active: true,
                                },
                            ],
                        } as SBRouteData,
                        component: value.component,
                    })),
                ],
            },
            {
                path: 'utilities',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'animations',
                    },
                    ...styleReferenceRouteVariables.utilities.map(value => ({
                        path: value.name,
                        data: {
                            title: `${value.title} - SB Admin Pro Angular`,
                            breadcrumbs: [
                                {
                                    text: 'Dashboard',
                                    link: '/dashboard',
                                },
                                {
                                    text: value.title,
                                    active: true,
                                },
                            ],
                        } as SBRouteData,
                        component: value.component,
                    })),
                ],
            },
            {
                path: 'page-headers',
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'simplified',
                    },
                    ...styleReferenceRouteVariables.pageHeaders.map(value => ({
                        path: value.name,
                        data: {
                            title: `${value.title} - SB Admin Pro Angular`,
                            breadcrumbs: [
                                {
                                    text: 'Dashboard',
                                    link: '/dashboard',
                                },
                                {
                                    text: value.title,
                                    active: true,
                                },
                            ],
                        } as SBRouteData,
                        component: value.component,
                    })),
                ],
            },
            {
                path: 'pages',
                children: [
                    {
                        path: 'blank',
                        canActivate: [],
                        component: styleReferenceContainers.BlankComponent,
                        data: {
                            title: 'Pages Blank - SB Admin Pro Angular',
                            breadcrumbs: [
                                {
                                    text: 'Dashboard',
                                    link: '/dashboard',
                                },
                                {
                                    text: 'Blank',
                                    active: true,
                                },
                            ],
                        } as SBRouteData,
                    },
                ],
            },
        ],
    },
    {
        path: 'static',
        data: {
            title: 'Dashboard Static - SB Admin Pro Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Static',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.StaticComponent,
    },
    {
        path: 'rtl',
        data: {
            title: 'Dashboard RTL - SB Admin Pro Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'RTL',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.RtlComponent,
    },
    {
        path: 'dark',
        data: {
            title: 'Dashboard Dark - SB Admin Pro Angular',
            breadcrumbs: [
                {
                    text: 'Dashboard',
                    link: '/dashboard',
                },
                {
                    text: 'Dark',
                    active: true,
                },
            ],
        } as SBRouteData,
        canActivate: [],
        component: dashboardContainers.DarkComponent,
    },
];

@NgModule({
    imports: [DashboardModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
