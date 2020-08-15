import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from 'src/app/model/User';
import { environment } from 'src/environments/environment';
import { RoleEnum } from 'src/app/enumerator/roleEnum';
import { Pageable } from '../model/pagination/Pageable';
import { Page } from '../model/pagination/Page';
import { Observable } from 'rxjs';
import { PaginationSearch } from '../model/pagination/PaginationSearch';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getInterviewers(){
    return this.httpClient.get<User[]>(`${environment.BASE_URL}/interviewers`);
  }
  getInterviewersPage(paginationSearch: PaginationSearch):Observable<Page<User>>{
    return this.httpClient.post<Page<User>>(`${environment.BASE_URL}/interviewers`,paginationSearch);
  }

  addInterviewer(userInfo){
    userInfo.role = {
      id: 2,
      name: RoleEnum.INTERVIEWER
    }
    return this.httpClient.post<User>(`${environment.BASE_URL}/auth/sign-up`,userInfo);
  }

  addHr(user){
    user.role= {
      id: 1,
      name: RoleEnum.HR
    }
    return this.httpClient.post<User>(`${environment.BASE_URL}/auth/sign-up`,user);
  }
}
