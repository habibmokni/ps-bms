/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/* Modules */
import { AppCommonModule } from '@common/app-common.module';
import { NavigationModule } from '@modules/navigation/navigation.module';

/* Components */
import * as authComponents from './components';

/* Containers */
import * as authContainers from './containers';

/* Guards */
import * as authGuards from './guards';

/* Services */
import * as authServices from './services';
import { AuthInterceptorService } from './services/auth-interceptor.service';

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
    providers: [
        ...authServices.services,
        ...authGuards.guards,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true,
        },
    ],
    declarations: [...authContainers.containers, ...authComponents.components],
    exports: [...authContainers.containers, ...authComponents.components],
})
export class AuthModule {}
