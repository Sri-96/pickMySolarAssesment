import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AuthserviceService {
  users = JSON.parse(localStorage.getItem('users')) || [];

  userid;
  constructor() { }

  // i dont have any apis with me that is the reason y i used localstorage for my project. 
  // go to dataservice file to see the examples of  httpClient method services (when we have the backend apis with us)  

  //login
  authenticate(body) {
    console.log(body);
    const { username, password } = body;
    const user = this.users.find(x => x.email === username && x.password === password);
    if (!user) return ('Username or password is incorrect');

    const response = {
      status: 200,
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token: (user.id) ? user.id + 5 : null
    }
    localStorage.setItem("userId", response.id);
    return response;
  }

  //register
  register(body) {
    const user: any = body
    console.log(user);
    if (this.users.find(x => x.email === user.email)) {
      return ('Email "' + user.email + '" is already taken')
    }

    user.id = this.users.length ? this.users.length + 1 : 1;
    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));

    const registerRes = {
      status: 200,
      body: user

    }
    return registerRes;
  }

  //getusers
  getUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (!this.isLoggedIn()) return false;
    return users;
  }

  //Deleting User 
  deleteUser(id) {
    if (!this.isLoggedIn()) return false;
    this.users = this.users.filter(x => x.id !== id);
    localStorage.setItem('users', JSON.stringify(this.users));
    return this.users;
  }

//logout
  logout() {
    localStorage.removeItem("userId");
    if (!localStorage.getItem("userId")) return true;

    return false;
  }

  // helper functions
  isLoggedIn(): boolean {
    this.userid = localStorage.getItem("userId")
    if (this.userid) {
      return true;
    }
    else {
      return false;
    }
  }
}
