import { Injectable } from "@angular/core";
import { BackendService } from '../services/backend.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiConstants } from '../../constants/api-constants';

@Injectable()
export class AuthService extends BackendService {
    constructor(http: HttpClient) {
        super(http);
    }

    getToken() {
        //check if token exist in localStorage
        let token = localStorage.getItem('auth_token') || ''
        if (token) {
            return new Promise((resolve, reject) => {
                resolve(token)
            })
        } else {
            return new Promise((resolve, reject) => {
                this.fetchToken().subscribe((data) => {
                    localStorage.setItem('auth_token', data.access_token)
                    resolve(data.access_token);
                })
            })
        }

    }

    fetchToken() {
        const body = new HttpParams()
            .set(`grant_type`, "************")
            .set(`client_id`, "************")
            .set(`client_secret`, "**********");
        return this.invokeHttpPostCall(ApiConstants.GET_TOKEN, body.toString(), true);
    }


}