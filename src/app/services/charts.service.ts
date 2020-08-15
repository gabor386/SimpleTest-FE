import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TestGroup } from '../model/TestGroup';
import { Test } from '../model/Test';
import { TestGroupStatistics, TestStatistics } from '../model/TestGroupStatistics';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private httpClient: HttpClient) { }

  getTestsTotal(){
    return this.httpClient.get<TestStatistics>(`${environment.BASE_URL}/statistics/tests/all`);
  }

  getChartData(){
    return this.httpClient.get<TestGroupStatistics[]>(`${environment.BASE_URL}/statistics/tests`);
  }
}
