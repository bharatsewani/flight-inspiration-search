import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiConstants } from '../../constants/api-constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler) {
    if (request.url !== `${ApiConstants.BASE_URL}${ApiConstants.GET_TOKEN}`) {

      //get the token first
      let token = await this.authService.getToken();

      //attaching the token in header
      let req = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
        }
      });
      //go ahead
      return next.handle(req).toPromise();
    } else {
      // if reuqet url is for getting token
      let req = request.clone({
        setHeaders: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return next.handle(req).toPromise();
    }

  }
}