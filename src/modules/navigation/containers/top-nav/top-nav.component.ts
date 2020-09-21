import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../auth/services';

@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;
    @Input() rtl = false;
    constructor(private navigationService: NavigationService, private authService: AuthService) {}
    ngOnInit() {
        console.log(this.authService.isLogged2);
        this.userSub = this.authService.isLogged.subscribe(user => {
            console.log(user);
            this.isAuthenticated = !user ? false : true;
            console.log('not user:', !user);
            console.log('not-NOT user:', !!user);
        });
    }
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
    onLogout() {
        this.authService.logout();
    }
    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
