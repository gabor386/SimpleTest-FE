import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TestService } from 'src/app/services/test.service';
import { Test } from 'src/app/model/Test';
import { ToastrService } from 'ngx-toastr';
import { Answer } from 'src/app/model/Answer';
import { FormArray, FormControl } from '@angular/forms';
import { AnswerService } from 'src/app/services/answer.service';
import { ModalConfirmService } from 'src/app/services/modal-confirm.service';


@Component({
  selector: 'app-answer-page',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.css']
})
export class AnswerPageComponent implements OnInit {

  selectedQuestionIndex: number = 0;
  answerForm = new FormArray([]);
  test: Test;
  answers: Answer[] = new Array<Answer>();

  constructor(private route: ActivatedRoute,
    private testService: TestService,
    private toastr: ToastrService,
    private answerService: AnswerService,
    private router: Router,
    private modalConfirmService: ModalConfirmService) { }


  ngOnInit(): void {
    this.getTest(this.route.snapshot.paramMap.get("id"));
  }

  getTest(id) {
    this.testService.getTestById(id).subscribe((res) => {
      this.test = res;
      this.test.testTemplate.question.forEach((question) => {
        this.answers.push(new Answer(question, this.test));
        this.answerForm.push(new FormControl(''));
      });
    }, (err) => {
      this.toastr.show(err.message, "Test unavailable :(");
      this.router.navigate(['/']);
    });
  }

  submit() {
    this.modalConfirmService.confirm('Are you sure ?', 'Do you really want to submit you answers ?')
      .then((confirmed) => {
        if (confirmed) {
          this.answers.forEach((answer, i) => {
            answer.answerText = this.answerForm.controls[i].value;
          });
          this.answerService.addAnswers(this.answers, this.test.id).subscribe((res) => {
            this.toastr.success("Your test has been submitted.", "Success");
            this.router.navigate(['/']);
          }, (err) => {
            this.toastr.show(err.message, "Something went wrong");
          });
        } else {
          this.toastr.show("Answers not confirmed", "Answers not confirmed");
        }
      });
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
