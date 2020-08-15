import { Injectable } from '@angular/core';
import { TestGroup } from '../model/TestGroup';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class TestGroupsService {

  constructor(private httpClient: HttpClient) { }

  getTemplates(){
    return this.httpClient.get<TestGroup[]>(`${environment.BASE_URL}/test-groups`);
  }

  addTest(testGroupInformation){
    return this.httpClient.post<TestGroup>(`${environment.BASE_URL}/addNewTestTemaplte`,testGroupInformation)
  }

  addGroup(group){
    return this.httpClient.post<TestGroup>(`${environment.BASE_URL}/test-groups`,group);
  }
  
}
