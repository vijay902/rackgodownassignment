import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Godown } from './models/godown';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GodownService {

  constructor(private http: HttpClient,
  ) {

  }

  // Uses http.get() to load data from a single API endpoint
  getGodowns(): Observable<Godown[]> {
    console.log("service");
    return this.http.get<Godown[]>('https://localhost:44390/api/godown');
  }

  getGodown(id: number): Observable<Godown> {
    return this.http.get<Godown>('https://localhost:44390/api/godown/' + id);
  }

  checkIsDefault(): Observable<boolean> {
    return this.http.get<any>('https://localhost:44390/api/godown/isdefault')
  }


  deleteGodown(id: number) {
    this.http.delete('https://localhost:44390/api/godown/' + id).subscribe(data => {
    });
  }


  addGodown(godown: Godown): Observable<Godown> {

    let body = {
      Id: 0,
      Description: godown.Description,
      Code: godown.Code,
      Address: godown.Address,
      IsDefault: godown.IsDefault,
      IsActive: godown.IsActive
    };
    return this.http.post<Godown>('https://localhost:44390/api/godown', JSON.stringify(body), httpOptions);
  };

  editGodown(godown: Godown): void {
    console.log('calling godown update service');

    let body = {
      Id: godown.Id,
      Description: godown.Description,
      Code: godown.Code,
      Address: godown.Address,
      IsDefault: godown.IsDefault,
      IsActive: godown.IsActive
    };

    this.http.post('https://localhost:44390/api/godown/update', JSON.stringify(body), httpOptions)
      .subscribe((data) => { console.log(data) }
      )

  };
}
