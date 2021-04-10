import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { FlightSearchResult } from './models/flight-inspiration-search.model';
import { AppConstants } from './constants/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flight-inspiration-search';
  results : Array<FlightSearchResult> = []
  origin: string = '';
  constructor(public searchService: SearchService){

  }

  columns = [
    { title: "Origin", key: "origin" },
    { title: "Destination", key: "destination" },
    { title: "Departure Date", key: "departureDate" },
    { title: "Return Date", key: "returnDate" },
    { title: "Price", key: "price"}
  ];

  searchResults(){
     this.searchService.searchFlights({'origin':this.origin}).subscribe((response)=> {
       if(response && response.data){
          this.results = response.data.map((res:any)=> {
            return new FlightSearchResult(res.origin, res.destination, res.departureDate, res.returnDate, res.price.total);
        })
       }
        console.log('response received', this.results);
     }, (error)=> {
        if(error.code == AppConstants.ERROR_CODES.AUTH_ERROR){
          console.log('token expired');
          localStorage.removeItem('auth_token');
        }
        console.log('some error occured');
     })
  }
}
