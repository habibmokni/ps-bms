import * as styleReferenceContainers from '@modules/style-reference/containers';

export interface CodeSample {
    language: 'ts' | 'pug';
    code: string;
}

export const styleReferenceRouteVariables = {
    components: [
        {
            name: 'alerts',
            title: 'Alerts',
            component: styleReferenceContainers.AlertsComponent,
        },
        {
            name: 'badges',
            title: 'Badges',
            component: styleReferenceContainers.BadgesComponent,
        },
        {
            name: 'buttons',
            title: 'Buttons',
            component: styleReferenceContainers.ButtonsComponent,
        },
        {
            name: 'cards',
            title: 'Cards',
            component: styleReferenceContainers.CardsComponent,
        },
        {
            name: 'dropdowns',
            title: 'Dropdowns',
            component: styleReferenceContainers.DropdownsComponent,
        },
        {
            name: 'forms',
            title: 'Forms',
            component: styleReferenceContainers.FormsComponent,
        },
        {
            name: 'modal',
            title: 'Modal',
            component: styleReferenceContainers.ModalComponent,
        },
        {
            name: 'navigation',
            title: 'Navigation',
            component: styleReferenceContainers.NavigationComponent,
        },
        {
            name: 'progress',
            title: 'Progress',
            component: styleReferenceContainers.ProgressComponent,
        },
        {
            name: 'toasts',
            title: 'Toasts',
            component: styleReferenceContainers.ToastsComponent,
        },
        {
            name: 'tooltips',
            title: 'Tooltips',
            component: styleReferenceContainers.TooltipsComponent,
        },
    ],
    utilities: [
        {
            name: 'animations',
            title: 'Animations',
            component: styleReferenceContainers.AnimationsComponent,
        },
        {
            name: 'background',
            title: 'Background',
            component: styleReferenceContainers.BackgroundComponent,
        },
        {
            name: 'borders',
            title: 'Borders',
            component: styleReferenceContainers.BordersComponent,
        },
        {
            name: 'shadows',
            title: 'Shadows',
            component: styleReferenceContainers.ShadowsComponent,
        },
        {
            name: 'typography',
            title: 'Typography',
            component: styleReferenceContainers.TypographyComponent,
        },
    ],
    pageHeaders: [
        {
            name: 'simplified',
            title: 'Simplified Headers',
            component: styleReferenceContainers.HeadersSimplifiedComponent,
        },
        {
            name: 'content-overlap',
            title: 'Content Overlap',
            component: styleReferenceContainers.HeadersOverlapComponent,
        },
        {
            name: 'breadcrumbs',
            title: 'Breadcrumbs',
            component: styleReferenceContainers.HeadersBreadcrumbsComponent,
        },
        {
            name: 'light',
            title: 'Light',
            component: styleReferenceContainers.HeadersLightComponent,
        },
    ],
};
