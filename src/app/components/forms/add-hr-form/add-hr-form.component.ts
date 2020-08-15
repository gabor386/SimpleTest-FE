import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-add-hr-form',
  templateUrl: './add-hr-form.component.html',
  styleUrls: ['./add-hr-form.component.css']
})
export class AddHrFormComponent implements OnInit {
  hr: User = new User;
  constructor(private fb: FormBuilder, private userService: UserService, private toastr:ToastrService,
    public activeModal: NgbActiveModal) { }

  hrForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
      firstName: ['',[Validators.required]],
      lastName: ['',[Validators.required]]
  });
  ngOnInit(): void {
  }
  
  onSubmit(){
    console.log("im here in on submit");
    this.hr.email=this.hrForm.value['email'];
    this.hr.firstName=this.hrForm.value['firstName'];
    this.hr.lastName=this.hrForm.value['lastName'];
    this.userService.addHr(this.hr).subscribe((res)=>{
      this.toastr.success("Hr added!");
      this.activeModal.close();
    },(err)=>{
      this.toastr.show("Hr addition failed!");
    })
  }

  get email() {
    return this.hrForm.get('email');
  }
  get firstName() {
    return this.hrForm.get('firstName');
  }
  get lastName() {
    return this.hrForm.get('lastName');
  }
}
