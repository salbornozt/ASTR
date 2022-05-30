import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponseModel } from 'app/core/user/user.response.model';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { Proceso } from './proceso.types';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

   _procesos : BehaviorSubject<Proceso[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) {

   }


   add(req :any): Observable<any>{
     return this._httpClient.post('http://192.81.219.225:3000/api/procesos/', req).pipe(
      switchMap((response: any) => {
          console.log(response);
          
          return of(response);
      })
  );

   }

   getProcesos(): Observable<UserResponseModel>
    {        //cambiar url
        return this._httpClient.get<UserResponseModel>('http://192.81.219.225:3000/api/procesos').pipe(
            tap((result) => {
                this._procesos.next(result.body);
                console.log(result);                
            })
        );
    }
}
