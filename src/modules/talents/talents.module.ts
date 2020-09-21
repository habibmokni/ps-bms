/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as talentsComponents from './components';

/* Containers */
import * as talentsContainers from './containers';

/* Guards */
import * as talentsGuards from './guards';

/* Services */
import * as talentsServices from './services';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppCommonModule,
        NavigationModule,
    ],
    providers: [...talentsServices.services, ...talentsGuards.guards],
    declarations: [...talentsContainers.containers, ...talentsComponents.components],
    exports: [...talentsContainers.containers, ...talentsComponents.components],
})
export class TalentsModule {}
