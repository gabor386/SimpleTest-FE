import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { TestTemplateService } from 'src/app/services/test-template.service';
import { TestTemplate } from 'src/app/model/TestTemplate';
import { UserService } from 'src/app/services/user.service';
import { TestService} from 'src/app/services/test.service';
import {CandidateService} from 'src/app/services/candidate.service';
import { Test } from 'src/app/model/Test';
import { Candidate } from 'src/app/model/Candidate';
import {Router} from "@angular/router";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-candidate-form',
  templateUrl: './add-candidate-form.component.html',
  styleUrls: ['./add-candidate-form.component.css']
})
export class AddCandidateFormComponent implements OnInit {
  templates: TestTemplate[];
  interviewers: User[];
  test: Test= new Test;
  selectedTemplate: TestTemplate = null;
  selectedInterviewer: User = null;
  candidate: Candidate;
  constructor(private fb: FormBuilder,private testTemplateService: TestTemplateService,private userService: UserService,
              private testService: TestService,private candidateService: CandidateService,private router: Router,
              public activeModal: NgbActiveModal,private toastr: ToastrService) { }


  candidateForm = this.fb.group({
    user: this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]]
    }),
    questionnaire: this.selectedTemplate,
    reviewer: this.selectedInterviewer
  });




  ngOnInit(): void {
    this.getTemplates();
    this.getInterviewers();
  }

  getInterviewers(){
    this.userService.getInterviewers().subscribe((res)=>{
      this.interviewers=res;
      this.selectedInterviewer = this.interviewers[0];
    });
  }

  getTemplates(){
    this.testTemplateService.getTemplates().subscribe((res)=>{
      this.templates=res;
      this.selectedTemplate = this.templates[0];
    });
  }

  onSubmit(){
    this.candidateService.addCandidate(this.candidateForm.value['user']).subscribe((res)=>{
      this.test.interviewer=this.candidateForm.value['reviewer'];
      this.test.testTemplate=this.candidateForm.value['questionnaire'];
      this.testService.addTest(this.test,res.id).subscribe((res)=>{
        this.toastr.success('Candidate added!');
      },(err)=>{
        this.toastr.show('Add new candidate failed!');
      });
      this.router.navigate([`/candidates`]);
      this.activeModal.close('refresh');
    },(err)=>{
      this.toastr.show('Add new candidate failed!');
    })
  }

  get email() {
    return this.candidateForm.get('user').get('email');
  }
  get firstName() {
    return this.candidateForm.get('user').get('firstName');
  }
  get lastName() {
    return this.candidateForm.get('user').get('lastName');
  }
}
