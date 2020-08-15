import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../model/LoginResponse';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private httpClient: HttpClient, private router: Router) { }

  changePassword(passwords,id){
    return this.httpClient.post(`${environment.BASE_URL}/password/change/${id}`,passwords);
  }

   login(loginInformation) {
    return this.httpClient.post<LoginResponse>(`${environment.BASE_URL}/login`, loginInformation);
   }

   getToken(){
     return localStorage.getItem("token");
   }

   getUser(){
     return JSON.parse(localStorage.getItem("user"));
   }

   setToken(token){
     localStorage.setItem("token", token);
   }

   setUser(user){
     localStorage.setItem("user", JSON.stringify(user));
   }

   public isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/login']);
  }

  getRole(){
    if(this.isAuthenticated()) {
      var user = this.getUser();
      return user["role"]["name"];
    } 
    return null;  
  }

  getUserID(){
    if(this.isAuthenticated()) {
      var user = this.getUser();
      return user.id;
    } 
    return null;  
  }

}
