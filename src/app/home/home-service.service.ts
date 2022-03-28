import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { ShippingAddress } from '../address-confirmation/address.model';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  // http://3.68.132.233:8180
  api_path = "http://localhost:8080"

  constructor(private http: HttpClient) { }


  public validateUrl(oneTimeString: any) {
    return this.http.post(this.api_path + "/api/v1/check_one_time_link", { urlParam: oneTimeString })
      .pipe(
        map((data: boolean) => {
          return data;
        }), catchError(error => {
          return throwError(error);
        })
      );
  }

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

  //returns address if dob,zip and user code valid
  public validateDobAndZip(zip: any, dob: any, oneTimeString: any){
    return this.http.post(this.api_path + "/api/v1/validate_dob_zip", { dateOfBrith: dob, usZip: zip, oneTimeCode: oneTimeString })
    .pipe(
      map((data: ShippingAddress) => {
        return data;
      }), catchError(error => {
        return throwError(error);
      })
    );
 }

  public logUserActions(oneTimeString: any, action: any, actionLocation: any) {
    return this.http.post(this.api_path + "/api/v1/log_user_actions", { oneTimeString: oneTimeString, action: action, actionLocation: actionLocation })
      .pipe(
        map((data: boolean) => {
          return data;
        }), catchError(error => {
          return throwError(error);
        })
      );
  }

  //dummy page
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

  public displayMessageForAction(messageKey: any) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("messageKey", messageKey);
    return this.http.get(this.api_path + "/api/v1/message_for_display", { params: queryParams })
      .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError(error);
        })
      );
  }
 
}
