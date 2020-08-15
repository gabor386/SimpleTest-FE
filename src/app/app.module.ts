import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HrDashboardComponent } from './components/hr-dashboard/hr-dashboard.component';
import { CandidateDashboardComponent } from './components/candidate-dashboard/candidate-dashboard.component';
import { InterviewerDashboardComponent } from './components/interviewer-dashboard/interviewer-dashboard.component';
import { AuthGuardService } from './guards/auth-guard.service';

import { FrameComponent } from './components/frame/frame.component';
import { DisplayTestsComponent } from './components/display-tests/display-tests.component';
import { AddCandidateFormComponent } from './components/forms/add-candidate-form/add-candidate-form.component';
import { TestTemplateService } from './services/test-template.service';
import { AddInterviewerFormComponent } from './components/forms/add-interviewer-form/add-interviewer-form.component';
import { DisplayCandidatesComponent } from './components/display-candidates/display-candidates.component';
import { SurnameSortPipe } from './pipes/surname-sort.pipe';
import { InviteCandidateFormComponent } from './components/forms/invite-candidate-form/invite-candidate-form.component';
import { AnswerPageComponent } from './pages/answer-page/answer-page.component';
import { AnswerService } from './services/answer.service';
import { DoneTestComponent } from './pages/done-test/done-test.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { ModalConfirmService } from './services/modal-confirm.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CandidateDetailsComponent } from './pages/candidate-details/candidate-details.component';
import { FileService } from './services/file.service';
import { DisplayInterviewersComponent } from './components/display-interviewers/display-interviewers.component';
import { DisplayTestsForInterviewersComponent } from './components/display-tests-for-interviewers/display-tests-for-interviewers.component';
import { AddTemplateFormComponent } from './components/forms/add-template-form/add-template-form.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { GradingTestsComponent } from './components/grading-tests/grading-tests.component';
import { CandidateDetailsGuardService } from './guards/candidate-details-guard.service';
import { HrChartsComponent } from './components/hr-charts/hr-charts.component';
import { AnswerTestGuardService } from './guards/answer-test-guard.service';
import { DoneTestGuardService } from './guards/done-test-guard.service';
import { HrRoleGuardService } from './guards/hr-role-guard.service';
import { InterviewerRoleGuardService } from './guards/interviwer-role-guard.service';
import { GradingTestGuardService } from './guards/grading-test-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChangePasswordGuardService } from './guards/change-password-guard.service';
import { AddHrFormComponent } from './components/forms/add-hr-form/add-hr-form.component';

import { ViewTestTemplateComponent } from './pages/view-test-template/view-test-template.component';
import { DisplayTestTemplateComponent } from './components/display-test-template/display-test-template.component';

import { PaginationComponent } from './components/pagination/pagination.component';







const appRoutes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "changePassword", component: ChangePasswordComponent, canActivate: [ChangePasswordGuardService]},
  { path: "", component: FrameComponent,canActivate: [AuthGuardService], children: [
    { path: "", component: DashboardComponent },
    { path: "404", component: NotFoundComponent },
    { path: "test/:id", component: AnswerPageComponent, canActivate: [AnswerTestGuardService] },
    { path: "test/done/:id", component: DoneTestComponent, canActivate: [DoneTestGuardService] },
    { path: "candidates", component: DisplayCandidatesComponent, canActivate: [HrRoleGuardService]},
    { path: "interviewers", component: DisplayInterviewersComponent, canActivate: [HrRoleGuardService]},
    { path: "testTemplate", component:AddTemplateFormComponent, canActivate: [InterviewerRoleGuardService]},
    { path: "grading/:id",component:GradingTestsComponent, canActivate: [GradingTestGuardService]},
    { path: "candidate/:id", component: CandidateDetailsComponent, canActivate: [CandidateDetailsGuardService] },
    { path: "viewTest", component: ViewTestTemplateComponent, canActivate: [InterviewerRoleGuardService] },
    { path: "**" , redirectTo: "/404"},
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HrDashboardComponent,
    CandidateDashboardComponent,
    InterviewerDashboardComponent,
    FrameComponent,
    AddCandidateFormComponent,
    DisplayTestsComponent,
    AddInterviewerFormComponent,
    DisplayCandidatesComponent,
    SurnameSortPipe,
    InviteCandidateFormComponent,
    AnswerPageComponent,
    DoneTestComponent,
    ModalConfirmComponent,
    AddTemplateFormComponent,
    GradingTestsComponent,
    CandidateDetailsComponent,
    DisplayInterviewersComponent,
    DisplayTestsForInterviewersComponent,

    ChangePasswordComponent,
    HrChartsComponent,
    NotFoundComponent,
    AddHrFormComponent,

    ViewTestTemplateComponent,
    DisplayTestTemplateComponent,

    PaginationComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{onSameUrlNavigation: 'reload'}),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5000
    }),
    NgbModule,
    ChartsModule,
    AngularEditorModule 
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    TestTemplateService,
    AuthGuardService,
    CandidateDetailsGuardService,
    AnswerService,
    ModalConfirmService,
    FileService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }