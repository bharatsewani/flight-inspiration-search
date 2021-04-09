import { Injectable } from '@angular/core';
import { BackendService } from '../shared/services/backend.service';
import {HttpClient} from '@angular/common/http'
import { ApiConstants } from '../constants/api-constants';

@Injectable()
export class SearchService extends BackendService {
    constructor(http: HttpClient){
        super(http);
    }

    searchFlights(searchParams:any) {
        let url = ApiConstants.FLIGHT_INSPIRATION_SEARCH + '?origin='+ searchParams.origin
        return this.invokeHttpGetCall(url)
    }
}