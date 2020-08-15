import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { TestService } from '../services/test.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { StatusEnum } from '../enumerator/statusEnum';
import "rxjs/add/operator/map"; 


@Injectable({
    providedIn: 'root'
})
export class GradingTestGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router, private testService: TestService, private toastr: ToastrService) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.testService.getTestById(route.params.id)
        .map((res)=> {
            if( (res.interviewer.id === Number(this.auth.getUserID())) &&
                (res.status === StatusEnum.REVIEW)) {
                return true;
            } else {
                this.toastr.show('You can\'t see this test', 'Access denied');
                this.router.navigate(['/']);
                return false;
            }
        }, (err) => {
            this.toastr.show('Test doesn\'t exist', 'Access denied');
            this.router.navigate(['/']);
            return false;
        });
    }
}