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
            },
            {
                id   : 'apps.empleados',
                title: 'Empleados',
                type : 'basic',
                icon : 'heroicons_outline:user-group',
                link : '/apps/empleados'
            }
        ]  
    },

    {
        id      : 'apps.ecommerce',
        title   : 'Procesos',
        type    : 'collapsable',
        icon    : 'heroicons_outline:shopping-cart',
        children: [
            {
                id   : 'apps.ecommerce.inventory',
                title: 'Lista de Procesos',
                type : 'basic',
                link : '/apps/ecommerce/inventory'
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
        id      : 'user-interface',
        title   : 'Seguros',
        subtitle: '',
        type    : 'group',
        icon    : 'heroicons_outline:collection',
        children: [
            {
                id      : 'user-interface.forms',
                title   : 'Seguros',
                type    : 'collapsable',
                icon    : 'heroicons_outline:pencil-alt',
                children: [
                    {
                        id   : 'user-interface.forms.wizards',
                        title: 'Agregar',
                        type : 'basic',
                        link : '/ui/forms/wizards'
                    }
                    /*,
                    {
                        id   : 'user-interface.forms.autos',
                        title: 'Autos',
                        type : 'basic',
                        link : '/ui/forms/autos'
                    }   
                    ,
                    {
                        id   : 'user-interface.forms.hogar',
                        title: 'Hogar',
                        type : 'basic',
                        link : '/ui/forms/hogar'
                    } 
                    ,
                    {
                        id   : 'user-interface.forms.arrendamiento',
                        title: 'Arrendamiento',
                        type : 'basic',
                        link : '/ui/forms/arrendamiento'
                    } 
                    ,
                    {
                        id   : 'user-interface.forms.vida',
                        title: 'Vida',
                        type : 'basic',
                        link : '/ui/forms/vida'
                    } 
                    ,
                    {
                        id   : 'user-interface.forms.excequias',
                        title: 'Excequias',
                        type : 'basic',
                        link : '/ui/forms/excequias'
                    } 
                    ,
                    {
                        id   : 'user-interface.forms.finanzas',
                        title: 'Finanzas',
                        type : 'basic',
                        link : '/ui/forms/finanzas'
                    } 
                    ,
                    {
                        id   : 'user-interface.forms.respCiviMed',
                        title: 'Responsabilidad Civil Medica',
                        type : 'basic',
                        link : '/ui/forms/respCiviMed'
                    } 
                    ,
                    {
                        id   : 'user-interface.forms.mascotas',
                        title: 'Mascotas',
                        type : 'basic',
                        link : '/ui/forms/mascotas'
                    } 
                    */
                ]
            }
        ]
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
