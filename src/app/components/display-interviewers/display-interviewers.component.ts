import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddInterviewerFormComponent } from 'src/app/components/forms/add-interviewer-form/add-interviewer-form.component';
import { DisplayTestsForInterviewersComponent } from '../display-tests-for-interviewers/display-tests-for-interviewers.component';
import { Page } from 'src/app/model/pagination/Page';
import { PaginationService } from 'src/app/services/pagination.service';
import { PaginationSearch } from 'src/app/model/pagination/PaginationSearch';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-display-interviewers',
  templateUrl: './display-interviewers.component.html',
  styleUrls: ['./display-interviewers.component.css']
})
export class DisplayInterviewersComponent implements OnInit {
  page: Page<User> = new Page();
  interviewers: User[] = [];
  searchText:string = '';
  searchTextUpdate = new Subject<string>();
  paginationSearch: PaginationSearch = new PaginationSearch();


  constructor(private userService: UserService,public modalService: NgbModal,private paginationService: PaginationService) {
    this.searchTextUpdate.pipe(
      debounceTime(500),distinctUntilChanged()).subscribe(value=>{
        this.getInterviewers();
      });
   }

  ngOnInit(): void {
    this.getInterviewers();
  }
  open(){
    this.modalService.open(AddInterviewerFormComponent).result.then(()=>{
      this.getInterviewers();
    });
  }
  openInterviewerModal(interviewer){
    
    const modalRef = this.modalService.open(DisplayTestsForInterviewersComponent,{size: 'lg'});
    modalRef.componentInstance.user = interviewer;
  }
  getInterviewers(){
    this.paginationSearch.searchText=this.searchText;
    this.paginationSearch.size=this.page.pageable.pageSize;
    this.paginationSearch.page=this.page.pageable.pageNumber;
      this.userService.getInterviewersPage(this.paginationSearch).subscribe((res)=>{
        this.page = res;
        this.interviewers = this.page.content;
      });
  }
  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getInterviewers();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getInterviewers();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getInterviewers();
  }
}
