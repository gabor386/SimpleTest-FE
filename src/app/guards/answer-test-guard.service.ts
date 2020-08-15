import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { StatusEnum } from '../enumerator/statusEnum';
import { TestService } from '../services/test.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import "rxjs/add/operator/map"; 


@Injectable({
    providedIn: 'root'
})
export class AnswerTestGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router, private testService: TestService, private toastr: ToastrService) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.testService.getTestById(route.params.id)
        .map((res)=> {
            if(res.candidate.id === Number(this.auth.getUserID()) && res.status===StatusEnum.INVITE ) {
                return true;
            } else {
                this.toastr.show('You can\'t see this test', 'Access denied');
                this.router.navigate(['/']);
                return false;
            }
        }, (err) => {
            this.toastr.show('Cant\'t see this test', 'Access denied');
            this.router.navigate(['/']);
            return false;
        });
    }
}