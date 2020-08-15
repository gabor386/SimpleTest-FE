import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/model/Candidate';
import { CandidateService } from 'src/app/services/candidate.service';
import { SurnameSortPipe } from 'src/app/pipes/surname-sort.pipe';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddCandidateFormComponent } from 'src/app/components/forms/add-candidate-form/add-candidate-form.component';
import { InviteCandidateFormComponent } from 'src/app/components/forms/invite-candidate-form/invite-candidate-form.component';
import { Router } from '@angular/router';
import { Page } from 'src/app/model/pagination/Page';
import { PaginationService } from 'src/app/services/pagination.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PaginationSearch } from 'src/app/model/pagination/PaginationSearch';




@Component({
  selector: 'app-display-candidates',
  templateUrl: './display-candidates.component.html',
  styleUrls: ['./display-candidates.component.css']
})
export class DisplayCandidatesComponent implements OnInit {
  page: Page<Candidate> = new Page();
  candidates: Candidate[] = [];
  searchText: string = '';
  searchTextUpdate = new Subject<string>();
  paginationSearch: PaginationSearch = new PaginationSearch();

  constructor(private candidateService: CandidateService, private modalService: NgbModal, private router: Router,
    private paginationService: PaginationService) { 
      this.searchTextUpdate.pipe(
        debounceTime(500),distinctUntilChanged()).subscribe(value=>{
          this.getCandidates();
        });
    }

  ngOnInit(): void {
    this.getCandidates();
    
  }
  open() {
    this.modalService.open(AddCandidateFormComponent).result.then(() => {
      this.getCandidates();
    });
  }
  openInvite(cand: Candidate) {
    const modalRef = this.modalService.open(InviteCandidateFormComponent);
    modalRef.componentInstance.candidate = cand;
  }
  getCandidates() {
    this.paginationSearch.searchText=this.searchText;
    this.paginationSearch.size=this.page.pageable.pageSize;
    this.paginationSearch.page=this.page.pageable.pageNumber;
    this.candidateService.getCandidates(this.paginationSearch).subscribe((res) => {
      this.page = res;
      this.candidates = this.page.content;
    });
  }
  toProfile(id) {
    this.router.navigate([`candidate/${id}`]);
  }

  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getCandidates();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getCandidates();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getCandidates();
  }
}
