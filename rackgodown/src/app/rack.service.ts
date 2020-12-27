import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Rack } from './models/rack';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RackService {

  constructor(private http: HttpClient,
  ) {

  }

  // Uses http.get() to load data from a single API endpoint
  getRacks(id:number): Observable<Rack[]> {
    return this.http.get<Rack[]>('https://localhost:44390/api/rack/getgodownracks/'+ id);
  }

  getRack(id: number): Observable<Rack> {
    return this.http.get<Rack>('https://localhost:44390/api/rack/' + id);
  }

  checkIsDefault(): Observable<boolean> {
    return this.http.get<any>('https://localhost:44390/api/rack/isdefault')
  }


  deleteRack(id:number){
    this.http.delete('https://localhost:44390/api/rack/'+ id).subscribe(data => {
    });
  }


  addRack(rack: Rack): Observable<Rack> {

    let body = {
      Id: 0,
      Description: rack.Description,
      Code: rack.Code,
      Capacity: rack.Capacity,
      IsDefault: rack.IsDefault,
      IsActive: rack.IsActive,
      GoDownId: rack.GoDownId
    };

    return this.http.post<Rack>('https://localhost:44390/api/rack', JSON.stringify(body), httpOptions);

  };

  editRack(rack: Rack): void {
    console.log('calling rack edit service');

    let body = {
      Id: rack.Id,
      Description: rack.Description,
      Code: rack.Code,
      Capacity: rack.Capacity,
      IsDefault: rack.IsDefault,
      IsActive: rack.IsActive
    };

    this.http.post('https://localhost:44390/api/rack/update', JSON.stringify(body), httpOptions)
      .subscribe((data) => { console.log(data) }
      )

  };

}


