import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/model/Test';
import { StatusEnum } from '../../enumerator/statusEnum';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.css']
})
export class CandidateDashboardComponent implements OnInit {

  tests: Test[];
  constructor(private toastr: ToastrService, 
              private router: Router,
              private testService: TestService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getTestsByID();
  }

  getTestsByID(){
    this.testService.getUndoneByCandidateId(this.authenticationService.getUserID())
      .subscribe((res)=> {
        this.tests = res;
      }, (err) => {
        this.toastr.show('Tests unavailable', 'Error !');
      });
  }

  answerTest(testId){
    this.router.navigate([`test/${testId}`]);
  }

}
