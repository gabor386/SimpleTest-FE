import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';
import * as jwt_decode from "jwt-decode";
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthenticationService, private toastr: ToastrService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticationService.getToken()}`
      }
    });
    if (this.authenticationService.getToken()) {
      let tokenInfo = jwt_decode(this.authenticationService.getToken());
      const date = new Date(0);
      let tokenExpDate = date.setUTCSeconds(tokenInfo.exp);
      if (tokenExpDate < new Date().valueOf()) {
        this.handleAuthError();
      } else {
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }

  private handleAuthError() {
    this.authenticationService.logout();
    this.toastr.show('Token expired!');
  }

}