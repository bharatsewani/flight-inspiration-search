import { Injectable } from "@angular/core";
import { BackendService } from '../services/backend.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable()
export class AuthService extends BackendService {
    constructor(http: HttpClient){
        super(http);
    }

    getToken() {
        //check if token exist in localStorage
        let token = localStorage.getItem('auth_token') || ''
        if(token){
            return new Promise((resolve, reject)=> {
                resolve(token)
            })
        } else {
           return new Promise((resolve, reject)=> {
               this.fetchToken().subscribe((data)=> {
                   localStorage.setItem('auth_token', data)
                   resolve(data);
               })
           })
        }
       
    }

    fetchToken(){
        return of('*******').pipe(delay(4000))
    }


}