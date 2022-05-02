import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { EmpleadoService } from 'app/modules/admin/apps/empleados/empleado.service';
import { Empleado, Country, Tag } from 'app/modules/admin/apps/empleados/empleados.types';
import { UserResponseModel } from 'app/core/user/user.response.model';

@Injectable({
    providedIn: 'root'
})
export class EmpleadoResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _contactsService: EmpleadoService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserResponseModel>
    {
        return this._contactsService.getContacts();
    }
}

@Injectable({
    providedIn: 'root'
})
export class EmpleadosEmpleadoResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private _contactsService: EmpleadoService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserResponseModel>
    {
        return this._contactsService.getContactById(route.paramMap.get('id'))
                   .pipe(
                       // Error here means the requested contact is not available
                       catchError((error) => {

                           // Log the error
                           console.error(error);

                           // Get the parent url
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');

                           // Navigate to there
                           this._router.navigateByUrl(parentUrl);

                           // Throw an error
                           return throwError(error);
                       })
                   );
    }
}

@Injectable({
    providedIn: 'root'
})
export class EmpleadoCountriesResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _contactsService: EmpleadoService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Country[]>
    {
        return this._contactsService.getCountries();
    }
}

@Injectable({
    providedIn: 'root'
})
export class EmpleadoTagsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _contactsService: EmpleadoService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]>
    {
        return this._contactsService.getTags();
    }
}
