import { Component, OnInit } from '@angular/core';
import { TestTemplateService } from 'src/app/services/test-template.service';
import { TestTemplate } from 'src/app/model/TestTemplate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DisplayTestsForInterviewersComponent } from 'src/app/components/display-tests-for-interviewers/display-tests-for-interviewers.component';
import { DisplayTestTemplateComponent } from 'src/app/components/display-test-template/display-test-template.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-test-template',
  templateUrl: './view-test-template.component.html',
  styleUrls: ['./view-test-template.component.css']
})
export class ViewTestTemplateComponent implements OnInit {

  constructor(private testTemplateService:TestTemplateService,
              public modalService: NgbModal,
              private toastrService: ToastrService,
              private router: Router) { }

  testTemplate: TestTemplate[];

  ngOnInit(): void {
    this.getTest();
  }
  getTest(){ 
    this.testTemplateService.getTemplates().subscribe((res)=>{
      this.testTemplate=res;
    })
  }

  openTestTemplateModal(testTemplate){
    const modalRef = this.modalService.open(DisplayTestTemplateComponent,{size: 'lg'});
    modalRef.componentInstance.testTemplate = testTemplate;

  }
  deleteTemplate(id){
      this.testTemplateService.deleteTestTemplate(id).subscribe((res)=>{
          this.toastrService.success("Succesfuly deleted");
          this.router.navigate(['/viewTest']);
          this.ngOnInit();
      },
      (err)=>{
        this.toastrService.warning("Can NOT delete this Test Template, it's related to candidate")
      });
  }

}
