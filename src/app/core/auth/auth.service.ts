import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { User } from '../user/user.types';
import { environment } from '../../../environments/environment';
@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
        sessionStorage.setItem('accessToken', token);
    }

    set userType(str:string){
        localStorage.setItem('userType', str);
        sessionStorage.setItem('userType', str);
    }

    set userId(id: string) {
        sessionStorage.setItem('cod_usuario', id);
    }

    set userEmail(email: string) {
        sessionStorage.setItem('email', email);
    }

    get userType(): string {
        return sessionStorage.getItem('userType') ?? '';
    }

    get accessToken(): string {
        return sessionStorage.getItem('accessToken') ?? '';
    }

    get userId(): string {
        return sessionStorage.getItem('cod_usuario') ?? '';
    }

    get userEmail(): string {
        return sessionStorage.getItem('email') ?? '';
    }

    set refreshToken(token: string) {
        localStorage.setItem('refreshToken', token);
        sessionStorage.setItem('refreshToken', token);
    }

    get refreshToken(): string {
        return sessionStorage.getItem('refreshToken');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<any> {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post(`${environment.APIEndpoint}`+'api/login/', credentials).pipe(
            switchMap((response: any) => {
                console.log('here ' + response)
                // Store the access token in the local storage
                this.accessToken = response.body.token;
                this.refreshToken = response.body.refreshToken;
                
                // Set the authenticated flag to true
                this._authenticated = true;

                let aux = AuthUtils._decodeToken(this.accessToken)
                console.log('0 0 '+aux.cod_usuario);
                

                this.userId = aux.cod_usuario;
                this.userEmail = aux.email;
                this.userType = aux.tipo_usuario;

                // Store the user on the user service
                this._userService.setUser(aux);

                //console.log(this._userService.user.nom_usuario);

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<boolean> {
        // Renew token
        return this._httpClient.post(`${environment.APIEndpoint}`+'api/login/token-refresh', {
            user: {
                email: this.userEmail
            },
            refreshToken: this.refreshToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {
                console.log('here 3 ' + response)
                if (response != false) {
                    // Store the access token in the local storage
                    this.accessToken = response.body.token;
                    this.refreshToken = response.body.refreshToken;
                    // Set the authenticated flag to true
                    this._authenticated = true;
                    let aux = AuthUtils._decodeToken(this.accessToken)
                    this.userId = aux.cod_usuario;
                    this.userEmail = aux.email;
                    this.userType = aux.tipo_usuario;
                    console.log(this.userEmail);
                    
    
                    // Store the user on the user service
                    //this._userService.user = response.user;
                    this._userService.setUser(aux); 
                    return of(true);
                }



                // Return true
                return of(false);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('cod_usuario');
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('cod_usuario');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('refreshToken');
        localStorage.removeItem('email');
        localStorage.removeItem('refreshToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            console.log("expired");
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        let aux = this.signInUsingToken();
        console.log('here 4' + aux);

        return aux;
    }
}
