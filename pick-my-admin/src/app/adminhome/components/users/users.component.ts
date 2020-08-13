import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from '../../../services/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  ListofUsers=[];
  constructor(private router: Router,private authservice:AuthserviceService) { }

  ngOnInit(): void {
   this.ListofUsers=this.authservice.getUsers()
   console.log(this.ListofUsers);
  }

}
