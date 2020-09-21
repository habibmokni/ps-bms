/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Module */
import { TalentsModule } from './talents.module';

/* Containers */
import * as talentsContainers from './containers';

/* Guards */
import * as talentsGuards from './guards';
import { SBRouteData } from '@modules/navigation/models';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: talentsContainers.TalentsComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list',
            },
            {
                path: 'list',
                data: {
                    title: 'Talents List',
                } as SBRouteData,
                component: talentsContainers.ListComponent,
            },
        ],
    },
];

@NgModule({
    imports: [TalentsModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class TalentsRoutingModule {}
