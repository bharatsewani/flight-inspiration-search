import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { timeoutWith, catchError } from 'rxjs/operators';
import { ApiConstants } from '../../constants/api-constants';

const TIMEOUT_DURATION = 90 * 1000;
const TIMEOUT_MSG = 'Service timeout: Service is taking more time. cancelling the service';

@Injectable()
export class BackendService {
    contextUrl = ApiConstants.BASE_URL;
    constructor(private httpClient: HttpClient) {
      
    }
    invokeHttpGetCall(url: string): Observable<any> {
        return this.httpClient.get(`${this.contextUrl}${url}`).pipe(
            timeoutWith(TIMEOUT_DURATION, throwError(TIMEOUT_MSG)),
            catchError(error => this.handleError(error))
        )
    }

    invokeHttpPostCall(url: string, body: any, isFormUrlEncodedContentType?:boolean): Observable<any> {
        if(isFormUrlEncodedContentType){
            let httpHeaders = new HttpHeaders();
            httpHeaders = httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
            let options = {'headers': httpHeaders};
            return this.httpClient.post(`${this.contextUrl}${url}`, body, options).pipe(
                timeoutWith(TIMEOUT_DURATION, throwError(TIMEOUT_MSG)),
                catchError(error => this.handleError(error))
            )
        } else {
            return this.httpClient.post(`${this.contextUrl}${url}`, body).pipe(
                timeoutWith(TIMEOUT_DURATION, throwError(TIMEOUT_MSG)),
                catchError(error => this.handleError(error))
            )
        }
     
       
    }

    handleError(error: any) {
        let errMsgObj: Object;
        if (error.error) {
                const body = error.error || '';
                const err = body.errors[0] || JSON.stringify(body);
                errMsgObj = err;
        } else {
            errMsgObj = {'msg': 'some error occured'}
        }
        return throwError(errMsgObj)
    }
}