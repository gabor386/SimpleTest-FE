import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Answer } from '../model/Answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private httpClient: HttpClient) { }

  addAnswers(answers, id) {
    return this.httpClient.post<Array<Answer>>(`${environment.BASE_URL}/answers/${id}`, answers);
  }

  addScore(answers,id){
    return this.httpClient.put<Array<Answer>>(`${environment.BASE_URL}/answers/${id}`, answers);
  }

}
