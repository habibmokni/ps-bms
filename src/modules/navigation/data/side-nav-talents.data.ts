import { SideNavItems, SideNavSection } from '@modules/navigation/models';
export const sideNavSections: SideNavSection[] = [
    {
        text: ' CORE',
        items: ['list'],
    },
];

export const sideNavItems: SideNavItems = {
    list: {
        icon: 'activity',
        link: '/talents',
        text: 'Talents List',
    },
};
