import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DecisionModel } from '../models/decision.model';
import { environment } from '../../environments/environment';
import { ServiceBase } from '../shared/service-base';

@Injectable({
  providedIn: 'root'
})

export class DecisionService extends ServiceBase {

  constructor(private _http: HttpClient) {
    super();

    this.url = environment.url;
    this.api = 'api/Decisions/';
  }

  getDecisions(): Observable<any[]> {
    return this._http.get<DecisionModel[]>(this.url + this.api)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
    );
  }

  getDecision(id: number): Observable<any> {
    return this._http.get<DecisionModel>(this.url + this.api + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveResult(decision: DecisionModel): Observable<any> {
    return this._http.put<DecisionModel>(this.url + this.api + decision.id, JSON.stringify(decision), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  clearResults(): Observable<any> {
    return this._http.put<DecisionModel>(this.url + this.api, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
}
