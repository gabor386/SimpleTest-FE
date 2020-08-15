import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.changePasswordForm=this.fb.group({
      oldPassword: ['',[Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      reTypePassword: ['',[Validators.required, Validators.minLength(8)]]
    },{
      validator: this.mustMatch('newPassword','reTypePassword')
    });
  }

  change(){
    const fd : FormData = new FormData();
    fd.append('oldPassword',this.changePasswordForm.get('oldPassword').value);
    fd.append('newPassword',this.changePasswordForm.get('newPassword').value);
    fd.append('confirmPassword',this.changePasswordForm.get('reTypePassword').value);
    this.authenticationService.changePassword(fd,this.authenticationService.getUserID()).subscribe((res)=>{
      this.authenticationService.setUser(res);
      this.toastr.success('Password changed!', 'Password changed');
      this.router.navigate(['/']);
    },(err)=>{
      this.toastr.show('Password change failed! Try again!', 'Password not changed');
    });
  }

  mustMatch(controlName: string,matchingControlName:string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(control.value!==matchingControl.value){
        matchingControl.setErrors( { mustMatch:true } );
      }else{
        matchingControl.setErrors(null);
      }
    }
  }

  get oldPassword(){
    return this.changePasswordForm.get('oldPassword');
  }
  get newPassword(){
    return this.changePasswordForm.get('newPassword');
  }
  get reTypePassword(){
    return this.changePasswordForm.get('reTypePassword');
  }
}
