import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  // http://3.68.132.233:8180
  api_path = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  public validateZip(zip: string) {
    return this.http.post(this.api_path + "/api/v1/check_us_zip", {usZip: zip})
      .pipe(
        map((data: string) => {
          return data;
        }), catchError(error => {
          return throwError(error);
        })
      );
  }

  public validateDobAndZip(zip: string, dob: string){
    return this.http.post(this.api_path + "/api/v1/validate_dob_zip", { dateOfBrith: dob, usZip: zip }, { responseType: 'text' })
    .pipe(
      map((data: string) => {
        return data;
      }), catchError(error => {
        return throwError(error);
      })
    );
 }

  public validateUrl(param: any) {
    return this.http.post(this.api_path + "/api/v1/check_one_time_link", { urlParam: param })
      .pipe(
        map((data: boolean) => {
          return data;
        }), catchError(error => {
          return throwError(error);
        })
      );
  }

  public getZipcodes() {
    return this.http.get(this.api_path + "/api/v1/zip_codes")
      .pipe(
        map((data: any[]) => {
          return data;
        }), catchError(error => {
          return throwError(error);
        })
      );
  }
 
}
