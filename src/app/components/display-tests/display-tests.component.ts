import { Component, OnInit } from '@angular/core';
import { Test } from 'src/app/model/Test';
import { TestService } from 'src/app/services/test.service';
import { ToastrService } from 'ngx-toastr';
import { StatusEnum } from '../../enumerator/statusEnum';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RoleEnum } from '../../enumerator/roleEnum'; 
import { FileCV } from 'src/app/model/FileCV';
import { FileService } from 'src/app/services/file.service';


@Component({
  selector: 'app-display-tests',
  templateUrl: './display-tests.component.html',
  styleUrls: ['./display-tests.component.css']
})
export class DisplayTestsComponent implements OnInit {

  tests: Test[];
  statusEnum = StatusEnum;
  userRole: String = '';
  roles = RoleEnum;
  constructor(private testService: TestService, 
    private toastr: ToastrService, 
    private router: Router, 
    private authenticationService: AuthenticationService,
    private fileService: FileService) { }

  ngOnInit(): void {
    this.getTestsByID();
    this.userRole = this.authenticationService.getRole();
  }

  getTestsByID(){
    this.testService.getTestsByUserID()
      .subscribe((res)=> {
        this.tests = res;
      }, (err) => {
        this.toastr.show(err.message);
      });
  }


  // candidate answers a new test
  answerTest(testId){
    this.router.navigate([`test/${testId}`]);
  }
  // interviewer grades ungraded tests
  gradeTest(id) {
    this.router.navigate([`grading/${id}`]);
  }

  // candidate can see graded/ungraded tests, interviewer only sees graded tests
  reviewTest(id) {
    this.router.navigate([`test/done/${id}`]);
  }

  


}
