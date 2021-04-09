import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    getHttpHeaders(){
       let httpHeaders = new HttpHeaders();
       
       httpHeaders = httpHeaders.set('Authorization', 'Bearer eAFA4RBAAPAHTCrxhKpnKxb5UBS0');
       return httpHeaders;
    }

    handleError(error: any) {
        let errMsg: string;
        if (error.error instanceof ErrorEvent) {
            try {
                const body = error.error || '';
                const err = body.message || JSON.stringify(body);
                errMsg = err;
            }
            catch (e) {
                errMsg = `${error.status}- ${error.statusText || ''}`
            }
        } else {
            errMsg = error.error.message ? error.message : error.toString();
        }
        return throwError(errMsg)
    }
}