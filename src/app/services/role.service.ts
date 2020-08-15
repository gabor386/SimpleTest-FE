import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Role} from 'src/app/model/Role'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  getRoles(){
    return this.httpClient.get<Role[]>(`${environment.BASE_URL}/roles`);
  }
}
