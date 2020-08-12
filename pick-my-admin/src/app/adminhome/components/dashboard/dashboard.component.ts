import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from '../../../services/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,private authservice:AuthserviceService) { }

  ngOnInit(): void {
  }

logout(){

  let res=this.authservice.logout()

  if(res){
    this.router.navigate(['/login']);
  }else{
    alert("something went wrong");
  }
  //todo
}

}
