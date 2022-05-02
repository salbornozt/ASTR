import { Route } from '@angular/router';
import { CanDeactivateEmpleadoDetails } from 'app/modules/admin/apps/empleados/empleado.guards';
import { EmpleadosEmpleadoResolver, EmpleadoCountriesResolver, EmpleadoResolver, EmpleadoTagsResolver } from 'app/modules/admin/apps/empleados/empleado.resolvers';
import { EmpleadoComponent } from 'app/modules/admin/apps/empleados/empleado.component';
import { EmpleadoListComponent } from 'app/modules/admin/apps/empleados/list/list.component';
import { EmpleadoDetailsComponent } from 'app/modules/admin/apps/empleados/details/details.component';

export const EmpleadoRoutes: Route[] = [
    {
        path     : '',
        component: EmpleadoComponent,
        resolve  : {
            tags: EmpleadoTagsResolver
        },
        children : [
            {
                path     : '',
                component: EmpleadoListComponent,
                resolve  : {
                    contacts : EmpleadoResolver,
                    countries: EmpleadoCountriesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : EmpleadoDetailsComponent,
                        resolve      : {
                            contact  : EmpleadosEmpleadoResolver,
                            countries: EmpleadoCountriesResolver
                        },
                        canDeactivate: [CanDeactivateEmpleadoDetails]
                    }
                ]
            }
        ]
    }
];
