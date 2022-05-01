import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponseModel } from 'app/core/user/user.response.model';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { CampoSeguro } from './campo.seguro.type';
import { Seguro } from './seguro.types';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {
  private _seguros: BehaviorSubject<Seguro[] | null> = new BehaviorSubject(null);
  private _camposSeguro : BehaviorSubject<CampoSeguro[] | null> = new BehaviorSubject(null);

  constructor(private _httpClient: HttpClient) { }



  /**
     * Getter for seguros
     */
  get seguros$(): Observable<Seguro[]> {
    return this._seguros.asObservable();
  }

  /**
     * Getter for campos
     */
   get campos$(): Observable<CampoSeguro[]> {
    return this._camposSeguro.asObservable();
  }

  getSeguros(): Observable<UserResponseModel> {
    return this._httpClient.get<UserResponseModel>('http://127.0.0.1:3000/api/seguros/').pipe(
      tap((result) => {
        console.log(result);
        this._seguros.next(result.body);
      })
    );
  }


  getCamposSeguros(cod_seg :number):Observable<UserResponseModel> {
    return this._httpClient.get<UserResponseModel>('http://localhost:3000/api/campos/'+cod_seg).pipe(
      tap((result) => {
        console.log('Campos '+result.body);
        this._camposSeguro.next(result.body);
      })
    );
  }
}
