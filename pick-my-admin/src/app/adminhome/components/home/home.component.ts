import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstName:string;
  LastName:string;
  role:string;
  id =localStorage.getItem("userId");
  constructor() { }

  ngOnInit(): void {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let user = users.filter(x => x.id == this.id);
    console.log(user);
    this.firstName = user[0].firstName;
    this.LastName = user[0].lastName;
    this.role = user[0].title;
  }

}
