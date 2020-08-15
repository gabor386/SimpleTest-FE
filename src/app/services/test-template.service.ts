import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TestTemplate } from 'src/app/model/TestTemplate';

@Injectable({
  providedIn: 'root'
})
export class TestTemplateService {

  constructor(private httpClient: HttpClient) { }

  getTemplates(){
    return this.httpClient.get<TestTemplate[]>(`${environment.BASE_URL}/getTemplates`);
  }
  deleteTestTemplate(id){
    return this.httpClient.delete(`${environment.BASE_URL}/deleteTestTemplate/${id}`);
  }
  
}
