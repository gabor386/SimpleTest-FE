import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService, 
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router ) { }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  login(){
    this.authenticationService.login(this.loginForm.value).subscribe((loginResponse) => {
      this.authenticationService.setToken(loginResponse.token);
      this.authenticationService.setUser(loginResponse.userDTO);
      if(!loginResponse.userDTO.passwordChanged){
        this.router.navigate(['/changePassword']);
      }else{
      this.router.navigate(['/']);
      }
    }, (err) => {
      this.toastr.show('Login failed, try again !', 'Login failed');
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

}
