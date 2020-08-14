import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  baseUrl = environment.baseUrl;
  user: string;
  token: string;
 

  constructor(private http: HttpClient) {
   
  }

  // i dont have any apis with me that is the reason y i used localstorage for my project. 
  // in this file i created the example  httpClient method services for  example ,when we have the backend apis with us  

  // Example register User 
  registerUser(rgstrdtls): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("content-type", "application/json");
    return this.http.post<HttpResponse<any>>(this.baseUrl + '/register', rgstrdtls, { headers, observe: 'response' }).pipe(map(res => this.storeMember(res)),
      catchError(err => {
        return of(err.error);
      })
    );

  }

  //logIn Member
  loginUser(lgndtls): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("content-type", "application/json");
    return this.http.post<any>(this.baseUrl + '/login', lgndtls, { headers, observe: 'response' }).pipe(map(res => this.storeMember(res)),
      catchError(err => {
        return of(err.error);
      })
    );
  }

  //store User
  storeMember(data) {
    const res = data.body;
    this.user = data.headers.get('User-id');
    this.token = data.headers.get('User-access-token');
    localStorage.setItem('isLoggedIn', this.token);
    localStorage.setItem('userId', this.user);    
    return res;
  }

  //isLoggedIn
  isLoggedIn(): boolean {

    if (localStorage.getItem('isLoggedIn')) {
      return true;
    }
    else {
      return false;
    }

  }

  //logout
  logoutUser() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('User-access-token', this.token);
    headers = headers.set('User-id', this.user);
    return this.http.post<any>(this.baseUrl + '/logout', null, { headers }).pipe(map(res => {return (res)}),
      catchError(err => {
        return of(err.error);
      })
    );
  }

   // Delete user
   deleteShift(userId): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("content-type", "application/json");
    return this.http.delete<HttpResponse<any>>(this.baseUrl  + '/delete' + userId, { headers, observe: 'response' }).pipe(map(res => res), catchError(err => {
      return of(err.error);
    }));
  }

  //UpdateWorker
  updateUser(userdtls): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("content-type", "application/json");   
    return this.http.put<HttpResponse<any>>(this.baseUrl + "/Update", userdtls, { headers, observe: 'response' }).pipe(map(res => res), catchError(err => {
      return of(err.error);
    }));}
  


   //getting  user profile Details
   getProfileDetails() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set("content-type", "application/json");
    // setting headers to send to backend
    // headers = headers.set('x-token', this.token);
    // headers = headers.set('x-id', this.user);
    return this.http.get<any>(this.baseUrl + "/profile", { headers }).pipe(map(res => res), catchError(err => {
      return of(err.error);
    }));
  }  
}

