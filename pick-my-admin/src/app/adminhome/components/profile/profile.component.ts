import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../../services/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private router: Router, private authservice: AuthserviceService) { }
  allUsers;
  userData;

  id = localStorage.getItem("userId");
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.allUsers = this.authservice.getUsers();
    let user = this.allUsers.filter(x => x.id == this.id);
    console.log(user);
    this.userData = user[0];

  }

}
