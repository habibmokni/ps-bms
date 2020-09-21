import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UtilityService } from '@common/services';
import { LayoutSidenav } from '@modules/navigation/classes';
import { sideNavItems, sideNavSections } from '@modules/navigation/data/side-nav-talents.data';
import { NavigationService } from '@modules/navigation/services';

@Component({
    selector: 'ps-layout-talents',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-talents.component.html',
    styleUrls: ['layout-talents.component.scss'],
})
export class LayoutTalentsComponent extends LayoutSidenav implements OnInit {
    sideNavItems = sideNavItems;
    sideNavSections = sideNavSections;
    sidenavStyle = 'sb-sidenav-light';
    rtl = false;
    static = false;

    constructor(
        public utilityService: UtilityService,
        public navigationService: NavigationService,
        public changeDetectorRef: ChangeDetectorRef
    ) {
        super(utilityService, navigationService, changeDetectorRef);
    }
    ngOnInit() {
        super.ngOnInit();
    }
}
