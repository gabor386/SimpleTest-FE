import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/model/Test';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Answer } from 'src/app/model/Answer';
import { ModalConfirmService } from 'src/app/services/modal-confirm.service';
import { AnswerService } from 'src/app/services/answer.service';

@Component({
  selector: 'app-grading-tests',
  templateUrl: './grading-tests.component.html',
  styleUrls: ['./grading-tests.component.css']
})
export class GradingTestsComponent implements OnInit {


  constructor(private testService: TestService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private answerService: AnswerService,
              private modalConfirmService: ModalConfirmService) { }

   
  answerForm=new FormArray([]);
  test: Test;
  answers:Answer[]=new Array<Answer>();
  selectedQuestionIndex: number = 0;

  
  ngOnInit(): void {
    this.getTest(this.route.snapshot.paramMap.get("id"));
    
  }

  getTest(id){
    this.testService.getTestById(id).subscribe((res)=>{
      this.test = res;
      this.test.testTemplate.question.forEach((question) => {
        this.answers.push(new Answer(question, this.test));
        
        this.answerForm.push(new FormControl('',Validators.required));
      });
      
    }, (err) => {
      this.toastr.show(err.message, "Test unavailable :(");
    });
  }
  onSubmit(){
    if(!this.answerForm.valid){
      this.toastr.show("Please grade all the answers", "Grades not confirmed");
      return;
    }
    this.modalConfirmService.confirm('Are you sure ?', 'Do you really want to submit grade for this test?')
    .then((confirmed) => {
      if(confirmed) {
        this.answers.forEach((answer, i) => {
          answer.id=this.test.answers[i].id;
          answer.score = this.answerForm.controls[i].value;
          
        });
        
        this.answerService.addScore(this.answers, this.test.id).subscribe((res)=> {
          this.toastr.success("Your test has been submitted.", "Success");
          this.router.navigate(['/']);
         
        }, error => {
          this.toastr.show(" Something went wrong ");
        });
      } else {
        this.toastr.show("Grades not confirmed", "Please try again");
      }

    }); 
  }

  candidate(id){
    this.router.navigate([`candidate/${id}`]);
  }

  setSelectedQuestionIndex(index: number) {
    this.selectedQuestionIndex = index;
  }

  markForCheck() {
    this.answers[this.selectedQuestionIndex].question.isMarkedForCheck = !this.answers[this.selectedQuestionIndex].question.isMarkedForCheck;
  }

  nextQuestion() {
    if(this.selectedQuestionIndex >= this.answers.length - 1) {
      return;
    }
    this.selectedQuestionIndex += 1;
  }

  previousQuestion() {
    if(this.selectedQuestionIndex === 0) {
      return;
    }
    this.selectedQuestionIndex -= 1;
  }

  
}
