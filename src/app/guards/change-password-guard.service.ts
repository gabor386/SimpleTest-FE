import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from '../model/User';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordGuardService implements CanActivate {
  user: User;
  constructor(private auth:AuthenticationService,private toastr: ToastrService,private router: Router) { }

  canActivate(): boolean{
    if(!this.auth.isAuthenticated()) {
      return false
    } else {
      this.user = this.auth.getUser();
      if(this.user.passwordChanged){
        this.toastr.show('You can\'t see this page!','Access Denied!');
        this.router.navigate(['/']);
        return false;
      }else{
        return true;
      }
    }
    
  }
}
