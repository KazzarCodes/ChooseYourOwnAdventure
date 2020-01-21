import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DiagramModel } from '../models/diagram.model';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { ServiceBase } from '../shared/service-base';

@Injectable({
  providedIn: 'root'
})
export class DiagramService extends ServiceBase {

  constructor(private http: HttpClient) {
    super();

    this.url = environment.url;
    this.api = 'api/Diagram/';
  }

  getDiagram(): Observable<DiagramModel[]> {
    var results = this.http.get<DiagramModel[]>(this.url + this.api)
        .pipe(
          retry(1),
          catchError(this.errorHandler));
    return results;
  }
}
