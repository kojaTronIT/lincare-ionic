import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) { }

  public validateZip(zip: string): Observable<boolean> {
    return this.http.post<boolean>("http://localhost:8080/api/v1/check_us_zip", {usZip: zip});
  }

  public validateDobAndZip(zip: string, dob: string){
    return this.http.post("http://localhost:8080/api/v1/validate_dob_zip", { dateOfBrith: dob, usZip: zip })
    .pipe(
      map((data: string) => {
        return data;
      }), catchError(error => {
        return throwError(error);
      })
    );
 }
 
}
