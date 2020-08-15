import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Test } from '../model/Test';
import { RoleEnum } from '../enumerator/roleEnum';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class TestService {

    constructor(private httpClient: HttpClient, 
        private authenticationService: AuthenticationService,
        private toastr: ToastrService) { }

    getTestsByUserID() {
        const role = this.authenticationService.getRole();
        const id = this.authenticationService.getUserID();
        if(role===RoleEnum.CANDIDATE) {
            return this.httpClient.get<Test[]>(`${environment.BASE_URL}/test/by-candidate-id/${id}`);
        }
        else if(role===RoleEnum.INTERVIEWER) {
            return this.httpClient.get<Test[]>(`${environment.BASE_URL}/test/by-interviewer-id/${id}`);
        } 
        else {
            this.toastr.show("Role invalid !");
        }
        
    }
    
    addTest(testInformation,id){
        return this.httpClient.post<Test>(`${environment.BASE_URL}/test/add/${id}`,testInformation);
    }
    getTestById(id){
        return this.httpClient.get<Test>(`${environment.BASE_URL}/test/${id}`);
    } 

    getTestsByInterviewerId(id){
        return this.httpClient.get<Test[]>(`${environment.BASE_URL}/test/by-interviewer-id/${id}`)
    }

    getTestsByCandidateId(id) {
        return this.httpClient.get<Test[]>(`${environment.BASE_URL}/test/by-candidate-id/${id}`);
    }

    getUndoneByCandidateId(id) {
        return this.httpClient.get<Test[]>(`${environment.BASE_URL}/test/undone-by-candidate-id/${id}`);
    }
}
