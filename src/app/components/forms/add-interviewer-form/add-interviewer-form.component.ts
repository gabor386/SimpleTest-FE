import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-interviewer-form',
  templateUrl: './add-interviewer-form.component.html',
  styleUrls: ['./add-interviewer-form.component.css']
})
export class AddInterviewerFormComponent implements OnInit {
  user: User;

  constructor(private fb: FormBuilder,private userService: UserService,public activeModal: NgbActiveModal,private router: Router,
    private toastr: ToastrService) { }

  interviewerForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]]
  })
  ngOnInit(): void {
  
  }
  onSubmit(){
    this.userService.addInterviewer(this.interviewerForm.value).subscribe((res)=>{
      this.user=res;
      this.toastr.success('Interviewer added!');
      this.router.navigate([`/interviewers`]);
    this.activeModal.close('refresh');
    },(err)=>{
      this.toastr.show('Add interviewer failed!');
    });
  }

  get email() {
    return this.interviewerForm.get('email');
  }
  get firstName() {
    return this.interviewerForm.get('firstName');
  }
  get lastName() {
    return this.interviewerForm.get('lastName');
  }
}
