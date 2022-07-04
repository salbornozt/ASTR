import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserResponseModel } from './user.response.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _users: BehaviorSubject<User[] | null> = new BehaviorSubject(null);
    private _empleados: BehaviorSubject<User[] | null> = new BehaviorSubject(null);


    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        console.log('here')
        console.log(value)
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    get empleados$(): Observable<User[]> {
        return this._empleados.asObservable();
    }

    get users$() : Observable<User[]>{
        return this._users.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    setUser(value: User) {
        // Store the value
        console.log('here')
        console.log(value)
        this._user.next(value);
    }
    /**
     * Get the current logged in user data
     */
    get(): Observable<UserResponseModel> {

        var token = sessionStorage.getItem('accessToken');
        var userId = sessionStorage.getItem('cod_usuario');
        console.log('user Id :'+userId);
        var header = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        var options = ({
            headers: header
        });
        return this._httpClient.get<UserResponseModel>(`${environment.APIEndpoint}`+'api/user/'+userId).pipe(
            tap((user) => {
                this._user.next(user.body);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        var token = localStorage.getItem('accessToken');
        console.log('token : Bearer '+token);
        var header = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        var options = ({
            headers: header
        });
        return this._httpClient.put(`${environment.APIEndpoint}`+'api/user/', { user },options).pipe(
            map((response) => {
                this._user.next(user);
            })
        );
    }

    update2(user: User): Observable<any> {
        var token = localStorage.getItem('accessToken');
        console.log('token : Bearer '+token);
        var header = new HttpHeaders({
            'Authorization': 'Bearer ' + token
        });
        var options = ({
            headers: header
        });
        return this._httpClient.put(`${environment.APIEndpoint}`+'api/user/perfil/', { user },options).pipe(
            map((response) => {
                this._user.next(user);
            })
        );
    }

    /**
     * get list of users
     */
    list():Observable<UserResponseModel> {
        return this._httpClient.get<UserResponseModel>(`${environment.APIEndpoint}`+'api/user').pipe(
            tap((response) => {
                this._users.next(response.body);
            })
        );
    }

    listEmpleados():Observable<UserResponseModel> {
        return this._httpClient.get<UserResponseModel>(`${environment.APIEndpoint}`+'api/user/empleados').pipe(
            tap((response) => {
                console.log(response.body);
                
                this._empleados.next(response.body);
            })
        );
    }

}
