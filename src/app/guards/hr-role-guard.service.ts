import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { RoleEnum } from '../enumerator/roleEnum';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class HrRoleGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router, private toastr: ToastrService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
        if(this.auth.getRole() === RoleEnum.HR) {
            return true;
        } else {
            this.toastr.show('You can\'t see this page', 'Access denied');
            this.router.navigate(['/']);
            return false;
        }
    }
}