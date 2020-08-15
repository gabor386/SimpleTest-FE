import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CandidateService } from 'src/app/services/candidate.service';
import { Candidate } from 'src/app/model/Candidate';
import { Router, ActivatedRoute } from '@angular/router';
import { FileCV } from 'src/app/model/FileCV';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/model/Test';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RoleEnum } from 'src/app/enumerator/roleEnum';
import { StatusEnum } from 'src/app/enumerator/statusEnum';
import { Answer } from 'src/app/model/Answer';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.css']
})
export class CandidateDetailsComponent implements OnInit {
  selectedTab: string = 'details';
  statuses = StatusEnum;

  fileForm: FormGroup;
  candidate: Candidate;
  selectedFile: File;
  tests: Test[];
  userRole: String = '';
  roles = RoleEnum;
  constructor(private fileService: FileService,
              private toastr: ToastrService,
              private candidateService: CandidateService,
              private route: ActivatedRoute,
              private testService: TestService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.fileForm = new FormGroup({
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });

    this.getCandidate(this.route.snapshot.paramMap.get("id"));
    this.getTests(this.route.snapshot.paramMap.get("id"));
    this.userRole = this.authenticationService.getRole();
  }

  downloadFile(file: FileCV) {
    this.fileService.downloadFile(file.id)
    .subscribe((res) => {
      const blob = new Blob([res], { type: "application/octet-stream" });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = data;
      link.download = String(file.fileName);
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      window.URL.revokeObjectURL(data);
      link.remove();
 
    }, err => {
      this.toastr.show("File download failed", "File unavailable");
    })
  }

  deleteFile(id) {
    this.fileService.deleteFile(id)
    .subscribe((res) => {
      this.toastr.success("File deleted", "File deleted successfuly!");
      this.ngOnInit();
    }, (err) => {
      this.toastr.show("Something went wrong :(", "Delete failed")
    });
  }

  submit() {
    const fd: FormData = new FormData();
    fd.append('file', this.fileForm.get('fileSource').value)
    this.fileService.uploadFile(fd, this.candidate.id)
    .subscribe((res)=> {
      this.toastr.success("File: "+ this.candidate.user.email+ "/"  + res.fileName + " uploaded", 'File upload successful!');
      this.ngOnInit();
    }, (err) => {
      this.toastr.show("You must add a file !", 'Something went wrong');
    });
  }

  fileChange(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileForm.patchValue({
        fileSource: file
      });
    }
  }

  getCandidate(id) {
    this.candidateService.getCandidateById(id)
    .subscribe((res) => {
      this.candidate = res;
    }, (err) => {
      this.toastr.show('User not loaded', 'Error');
    });
  }
  getTests(id) {
    this.testService.getTestsByCandidateId(id)
    .subscribe((res) => {
      this.tests = res;
    }, (err) => {
      this.toastr.show('Tests not loaded', 'Error');
    });
  }

  calculatePercent(answers: Answer[]) {
    const sum = answers.reduce((a, b) => a + b.score, 0);
    const avg = (sum / answers.length) || 0;
    return (avg * 100).toFixed(2);
  }


  get f(){
    return this.fileForm.controls;
  }

}
