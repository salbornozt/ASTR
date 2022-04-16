/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Dashboards',
        subtitle: '',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.project',
                title: 'Project',
                type : 'basic',
                icon : 'heroicons_outline:clipboard-check',
                link : '/dashboards/project'
            }
        ]
    },
    {
        id      : 'apps',
        title   : 'Gestión',
        subtitle: '',
        type    : 'group',
        icon    : 'heroicons_outline:document',
        children: [
        
            {
                id   : 'apps.contacts',
                title: 'Clientes',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/apps/contacts'
            }
        ]  
    },
    {
        id      : 'pages',
        title   : 'Cuenta',
        subtitle: '',
        type    : 'group',
        icon    : 'heroicons_outline:document',
        children: [
        
            {
                id   : 'account.settings',
                title: 'Ajustes',
                type : 'basic',
                icon : 'heroicons_outline:cog',
                link : '/pages/settings'
            }
        ]
    }
    ,

    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
