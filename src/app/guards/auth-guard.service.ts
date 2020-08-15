import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../model/User';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuardService implements CanActivate {
  user: User;
  constructor(public auth: AuthenticationService, public router: Router, private toastr: ToastrService) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }else{
      this.user = this.auth.getUser();
      if(!this.user.passwordChanged){
        this.router.navigate(['changePassword']);
        this.toastr.show('You must change your password!','Access denied!');
        return false;
      }
      return true;
    }
  }
}