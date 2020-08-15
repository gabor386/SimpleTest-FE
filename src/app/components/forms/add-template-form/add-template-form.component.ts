import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, NgModel } from '@angular/forms';
import { TestGroupsService } from 'src/app/services/test-groups.service';
import { TestGroup } from 'src/app/model/TestGroup';
import { Question } from 'src/app/model/Question';
import { Test } from 'src/app/model/Test';
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';



@Component({
  selector: 'app-add-template-form',
  templateUrl: './add-template-form.component.html',
  styleUrls: ['./add-template-form.component.css']
})
export class AddTemplateFormComponent implements OnInit {
  test:TestGroup;
  testTemplateGroups: TestGroup[];
  selectedTemplateGroup: TestGroup=null;
  closeResult: string;
  group: TestGroup;
  statusMessage: string;
  constructor(private fb:FormBuilder,private testGroupsServices:TestGroupsService,private modalService: NgbModal,
      private toastr: ToastrService,private router: Router) { }

  testTemplateForm=this.fb.group({
    testTemplateName: ['',[Validators.required]],
    testGroup:this.selectedTemplateGroup,
    timer:['',[Validators.required]],
    question:this.fb.array([
      this.fb.group({
        questionText:['',[Validators.required]]
      })
    ])
  })

  groupForm=this.fb.group({
    name:['',[Validators.required]]
  })

  ngOnInit(): void {
    this.getTestGroup();
    
  }

  getTestGroup(){
    this.testGroupsServices.getTemplates().subscribe((res)=>{
      this.testTemplateGroups=res;
      this.selectedTemplateGroup=this.testTemplateGroups[0];
    })
  }

  addQuestion(): void{
    (<FormArray>this.testTemplateForm.get('question')).push(this.fb.group({
      questionText:['',[Validators.required]]
    }));
  }

  removeQuestion(questionIndex: number): void{
    (<FormArray>this.testTemplateForm.get('question')).removeAt(questionIndex);

  }

  onSubmit(){
      this.testGroupsServices.addTest(this.testTemplateForm.value).subscribe((res)=>{
      this.test=res
      this.toastr.success("Successfully saved");
      this.router.navigate(['/']);
    },
    error=>{
      this.toastr.error("Test name is already exiting");
    }
    
    );
  }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.testGroupsServices.addGroup(this.groupForm.value).subscribe((res)=>{
        this.group=res;
        this.getTestGroup();
      });
      
      
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  getTemplateForm(){
    return this.testTemplateForm.get('question')['controls'];
  }
  
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

}
