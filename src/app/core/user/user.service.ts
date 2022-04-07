import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserResponseModel } from './user.response.model';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        console.log('here')
        console.log(value)
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    setUser(value: User){
    // Store the value
        console.log('here')
        console.log(value)
        this._user.next(value);
    }
    /**
     * Get the current logged in user data
     */
    get(): Observable<UserResponseModel>
    {

        var token = localStorage.getItem('accessToken');
      var header = new HttpHeaders({
        'Authorization' : 'Bearer '+token
      });
      var options = ({
        headers:header
      });
        return this._httpClient.get<UserResponseModel>('http://localhost:3000/api/user/1',options).pipe(
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
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }
}
