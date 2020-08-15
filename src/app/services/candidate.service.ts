import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Candidate } from '../model/Candidate';
import { Pageable } from '../model/pagination/Pageable';
import { Observable } from 'rxjs';
import { Page } from 'src/app/model/pagination/Page';
import { PaginationSearch } from '../model/pagination/PaginationSearch';


@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private httpClient: HttpClient) { }

  addCandidate(candidateInfo){
    return this.httpClient.post<Candidate>(`${environment.BASE_URL}/candidates/invite`,candidateInfo);
  }

  getCandidates(paginationSearch: PaginationSearch):Observable<Page<Candidate>>{
    return this.httpClient.post<Page<Candidate>>(`${environment.BASE_URL}/candidates`,paginationSearch);
  }

  getCandidateById(id) {
    return this.httpClient.get<Candidate>(`${environment.BASE_URL}/candidates/${id}`);
  }
}
