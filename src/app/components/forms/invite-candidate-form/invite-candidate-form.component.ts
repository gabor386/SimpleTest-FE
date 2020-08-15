import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { TestTemplate } from 'src/app/model/TestTemplate';
import { User } from 'src/app/model/User';
import { Candidate } from 'src/app/model/Candidate';
import { UserService } from 'src/app/services/user.service';
import { TestTemplateService } from 'src/app/services/test-template.service';
import { Test } from 'src/app/model/Test';
import { TestService } from 'src/app/services/test.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";




@Component({
  selector: 'app-invite-candidate-form',
  templateUrl: './invite-candidate-form.component.html',
  styleUrls: ['./invite-candidate-form.component.css']
})
export class InviteCandidateFormComponent implements OnInit {
  @Input() candidate: Candidate;

  templates: TestTemplate[];
  interviewers: User[];
  selectedTemplate: TestTemplate=null;
  selectedInterviewer: User = null;
  test: Test=new Test;
  constructor(private fb: FormBuilder,public activeModal: NgbActiveModal,private userService: UserService,
    private testTemplateService: TestTemplateService,private testService: TestService,private toastr: ToastrService,private router: Router) { }
  inviteCandidateForm = this.fb.group({
    questionnaire: this.selectedTemplate,
    reviewer: this.selectedInterviewer
  })
  ngOnInit(): void {
    this.getTemplates();
    this.getInterviewers();
  }

  getInterviewers(){
    this.userService.getInterviewers().subscribe((res)=>{
      this.interviewers=res;
      this.selectedInterviewer = this.interviewers[0];
    })
  }

  getTemplates(){
    this.testTemplateService.getTemplates().subscribe((res)=>{
      this.templates=res;
      this.selectedTemplate=this.templates[0];
    })
  }

  onSubmit(){
    this.test.interviewer=this.inviteCandidateForm.value['reviewer'];
    this.test.testTemplate=this.inviteCandidateForm.value['questionnaire'];
    this.testService.addTest(this.test,this.candidate.id).subscribe((res)=>{
      this.toastr.success('Invite sent!');
    },(err)=>{
      this.toastr.show('Invite failed!');
    });
    this.router.navigate([`/candidates`]);
    this.activeModal.close();
  }
}
