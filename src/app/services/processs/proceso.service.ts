import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  constructor(private _httpClient: HttpClient) {

   }


   add(req :any): Observable<any>{
     return this._httpClient.post('http://127.0.0.1:3000/api/procesos/', req).pipe(
      switchMap((response: any) => {
          console.log(response);
          
          return of(response);
      })
  );

   }
}
