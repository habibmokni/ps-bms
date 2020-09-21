import { LayoutAuthComponent } from './layout-auth/layout-auth.component';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard.component';
import { LayoutErrorComponent } from './layout-error/layout-error.component';
import { LayoutTalentsComponent } from './layout-talents/layout-talents.component';

export const layouts = [LayoutDashboardComponent, LayoutAuthComponent, LayoutErrorComponent, LayoutTalentsComponent];

export * from './layout-dashboard/layout-dashboard.component';
export * from './layout-auth/layout-auth.component';
export * from './layout-error/layout-error.component';
export * from './layout-talents/layout-talents.component';
