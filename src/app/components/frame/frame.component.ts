import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { RoleEnum } from '../../enumerator/roleEnum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddHrFormComponent } from 'src/app/components/forms/add-hr-form/add-hr-form.component';


@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private modalService:NgbModal) { }

  userRole: String;
  userID: Number;
  roles = RoleEnum;
  ngOnInit(): void {
    this.userRole = this.authenticationService.getRole();
    this.userID = this.authenticationService.getUserID();
  }
  addHR(){
    this.modalService.open(AddHrFormComponent);
  }
  signOut(){
    this.authenticationService.logout();
  }

}
