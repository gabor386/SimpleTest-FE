import { Component, OnInit, Input } from '@angular/core';
import { Test } from 'src/app/model/Test';
import { TestService } from 'src/app/services/test.service';
import { StatusEnum } from 'src/app/enumerator/statusEnum';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/User';



@Component({
  selector: 'app-display-tests-for-interviewers',
  templateUrl: './display-tests-for-interviewers.component.html',
  styleUrls: ['./display-tests-for-interviewers.component.css']
})
export class DisplayTestsForInterviewersComponent implements OnInit {
  @Input() user: User;
  tests: Test[] = [];
  statuses= StatusEnum;
  constructor(private testService: TestService,private router: Router,public activeModal: NgbActiveModal,
              private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getTests();
  }
  getTests() {
    this.testService.getTestsByInterviewerId(this.user.id).subscribe((res) => {
      this.tests = res;
    });
  }
  reviewTest(id) {
    this.activeModal.close();
    this.router.navigate([`test/done/${id}`]);
  }
}
