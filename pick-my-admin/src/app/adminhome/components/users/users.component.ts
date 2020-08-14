import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthserviceService } from '../../../services/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import Swal from 'sweetalert2'
import {FormControl, Validators} from '@angular/forms';

export interface PeriodicElement {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  acceptTerms: boolean;
  confirmPassword: string;
  password: string;
  registredDate:Date;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  ListofUsers
  tableData: PeriodicElement[];
  displayedColumns: string[] = ["id", "firstName", "lastName", "email", "title","registredDate", "action", "delete"];
  dataSource
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  user;
  lenghtOfUsers;
  role: string;
  id = localStorage.getItem("userId");

  constructor(private router: Router, private authservice: AuthserviceService, public dialog: MatDialog) { }

  ngOnInit() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.filter(x => x.id == this.id);
    this.role = user[0].title;
    if (this.role !== 'Admin' && this.authservice.isLoggedIn()) {
      this.router.navigate(['/admin/home']);
      return false;
    }
    this.getUsers();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getUsers() {
    this.ListofUsers = this.authservice.getUsers();
    this.lenghtOfUsers = this.ListofUsers.length;
    this.tableData = this.ListofUsers
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
  }

  deleteUser(user) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        this.ListofUsers = this.authservice.deleteUser(user.id);
        this.tableData = this.ListofUsers;
        this.dataSource = new MatTableDataSource(this.tableData);
        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        )
      }
    })
  }

  AddUser() {
    let user = {
      acceptTerms: true,
      confirmPassword: "123456",
      email: "",
      firstName: "",
      id: this.lenghtOfUsers + 1,
      lastName: "",
      password: "123456",
      title: "",
      registredDate:new Date()
    }
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableData.push(user);
        this.ListofUsers = this.tableData;
        localStorage.setItem('users', JSON.stringify(this.tableData));
        this.dataSource = new MatTableDataSource(this.tableData);
        this.table.renderRows();
      }
    });
  }

  editUser(user) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const userid = user.id;
        let userIndex = this.ListofUsers.findIndex(e => e.id == userid);
        let newArray = this.ListofUsers;
        newArray[userIndex] = user;
        this.ListofUsers = newArray;
        localStorage.setItem('users', JSON.stringify(this.ListofUsers));
      }
    });
  }


}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {
  name;
  Roles: any = ["Teacher", "Student"]

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {
    const firstName = data.firstName;
    this.name = firstName;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}