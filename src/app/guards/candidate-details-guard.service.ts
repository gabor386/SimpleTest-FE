import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { RoleEnum } from '../enumerator/roleEnum';

@Injectable()
export class CandidateDetailsGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.auth.getRole() != RoleEnum.INTERVIEWER &&this.auth.getRole() != RoleEnum.HR && this.auth.getUserID() != route.params.id) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}